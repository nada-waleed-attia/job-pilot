from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="JobPilot API",
    description="Intelligent Job Search and Auto-Apply Platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:5500"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Models
class User(BaseModel):
    id: Optional[int] = None
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    experience_level: Optional[str] = None
    job_type: Optional[str] = None
    current_title: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    skills: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    industry: Optional[str] = None
    bio: Optional[str] = None
    newsletter: Optional[bool] = False

class UserRegister(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    phone: str
    experience_level: str
    job_type: str
    current_title: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    skills: Optional[str] = None
    country: str
    city: str
    industry: str
    bio: Optional[str] = None
    newsletter: Optional[bool] = False

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class Job(BaseModel):
    id: Optional[int] = None
    title: str
    company: str
    location: str
    description: str
    requirements: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: str
    experience_level: str
    posted_date: Optional[datetime] = None
    application_deadline: Optional[datetime] = None
    source: str  # LinkedIn, Indeed, etc.
    url: str
    match_score: Optional[int] = None

class JobSearch(BaseModel):
    keywords: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    remote: Optional[bool] = False

class Application(BaseModel):
    id: Optional[int] = None
    user_id: int
    job_id: int
    status: str  # applied, viewed, interview, rejected, offered
    applied_date: datetime
    notes: Optional[str] = None

# Mock database (in production, use PostgreSQL)
users_db = {}
jobs_db = {}
applications_db = {}
user_id_counter = 1
job_id_counter = 1
application_id_counter = 1

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = users_db.get(email)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# Routes
@app.get("/")
async def root():
    return {"message": "Welcome to JobPilot API", "version": "1.0.0"}

@app.post("/api/auth/register", response_model=Token)
async def register(user: UserRegister):
    global user_id_counter
    
    # Check if user already exists
    if user.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    new_user = User(
        id=user_id_counter,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        phone=user.phone,
        experience_level=user.experience_level,
        job_type=user.job_type,
        current_title=user.current_title,
        linkedin=user.linkedin,
        github=user.github,
        skills=user.skills,
        country=user.country,
        city=user.city,
        industry=user.industry,
        bio=user.bio,
        newsletter=user.newsletter
    )
    
    users_db[user.email] = {
        "user": new_user.dict(),
        "password": hashed_password
    }
    
    user_id_counter += 1
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": new_user
    }

@app.post("/api/auth/login", response_model=Token)
async def login(user_credentials: UserLogin):
    user_data = users_db.get(user_credentials.email)
    
    if not user_data or not verify_password(user_credentials.password, user_data["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = User(**user_data["user"])
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@app.get("/api/users/profile", response_model=User)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@app.put("/api/users/profile", response_model=User)
async def update_profile(user_update: User, current_user: User = Depends(get_current_user)):
    # Update user data
    user_data = users_db[current_user.email]
    user_data["user"].update(user_update.dict(exclude_unset=True))
    
    return User(**user_data["user"])

@app.post("/api/jobs/search", response_model=List[Job])
async def search_jobs(search_params: JobSearch, current_user: User = Depends(get_current_user)):
    # Mock job search - in production, integrate with job APIs
    mock_jobs = [
        Job(
            id=1,
            title="Senior React Developer",
            company="شركة التقنية المتقدمة",
            location="الرياض، السعودية",
            description="نبحث عن مطور React خبير للانضمام إلى فريقنا...",
            requirements="React, TypeScript, Node.js",
            salary_min=12000,
            salary_max=18000,
            job_type="full-time",
            experience_level="senior",
            posted_date=datetime.now(),
            source="LinkedIn",
            url="https://linkedin.com/jobs/view/123",
            match_score=95
        ),
        Job(
            id=2,
            title="Full Stack Engineer",
            company="شركة الحلول الرقمية",
            location="جدة، السعودية",
            description="مطلوب مهندس Full Stack للعمل على مشاريع مبتكرة...",
            requirements="Python, Django, React",
            salary_min=10000,
            salary_max=15000,
            job_type="full-time",
            experience_level="mid",
            posted_date=datetime.now(),
            source="Indeed",
            url="https://indeed.com/jobs/view/456",
            match_score=78
        ),
        Job(
            id=3,
            title="Frontend Developer",
            company="شركة النموذجية",
            location="الدمام، السعودية",
            description="انضم إلى فريق الواجهات الأمامية...",
            requirements="Vue.js, JavaScript, CSS",
            salary_min=8000,
            salary_max=12000,
            job_type="full-time",
            experience_level="mid",
            posted_date=datetime.now(),
            source="Bayt",
            url="https://bayt.com/jobs/view/789",
            match_score=88
        )
    ]
    
    # Filter jobs based on search parameters
    filtered_jobs = mock_jobs
    
    if search_params.keywords:
        filtered_jobs = [job for job in filtered_jobs if search_params.keywords.lower() in job.title.lower()]
    
    if search_params.location:
        filtered_jobs = [job for job in filtered_jobs if search_params.location.lower() in job.location.lower()]
    
    if search_params.job_type:
        filtered_jobs = [job for job in filtered_jobs if job.job_type == search_params.job_type]
    
    return filtered_jobs

@app.post("/api/jobs/{job_id}/apply")
async def apply_to_job(job_id: int, current_user: User = Depends(get_current_user)):
    global application_id_counter
    
    # Check if job exists
    job_found = False
    for job_data in jobs_db.values():
        if job_data.get("id") == job_id:
            job_found = True
            break
    
    if not job_found:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Create application
    application = Application(
        id=application_id_counter,
        user_id=current_user.id,
        job_id=job_id,
        status="applied",
        applied_date=datetime.now()
    )
    
    applications_db[application_id_counter] = application.dict()
    application_id_counter += 1
    
    return {"message": "Application submitted successfully", "application_id": application.id}

@app.get("/api/users/applications", response_model=List[Application])
async def get_user_applications(current_user: User = Depends(get_current_user)):
    user_applications = [
        Application(**app_data) 
        for app_data in applications_db.values() 
        if app_data.get("user_id") == current_user.id
    ]
    
    return user_applications

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(current_user: User = Depends(get_current_user)):
    # Mock dashboard statistics
    return {
        "total_applications": 127,
        "views": 45,
        "interviews": 8,
        "success_rate": 85,
        "recent_applications": [
            {
                "title": "Senior Frontend Developer",
                "company": "شركة التقنية المتقدمة",
                "location": "الرياض",
                "status": "applied",
                "time": "منذ ساعتين"
            }
        ],
        "weekly_applications": [12, 19, 15, 25, 22, 30, 28],
        "weekly_views": [8, 12, 10, 18, 15, 20, 17]
    }

@app.post("/api/auto-apply/toggle")
async def toggle_auto_apply(current_user: User = Depends(get_current_user)):
    # Toggle auto-apply functionality
    return {"message": "Auto-apply settings updated", "enabled": True}

@app.post("/api/generate-cover-letter")
async def generate_cover_letter(job_id: int, current_user: User = Depends(get_current_user)):
    # Mock AI cover letter generation
    return {
        "cover_letter": f"""
السادة/إدارة الموارد البشرية في الشركة المحترمة،

تحية طيبة وبعد،

أكتب إليكم معبراً عن اهتمامي الشديد بالوظيفة المعلنة في شركتكم الموقرة. وبصفتي {current_user.first_name} {current_user.last_name}، خبير في مجال {current_user.industry} بخبرة تزيد عن 5 سنوات، أرى أن هذه الفرصة تتوافق تماماً مع مهاراتي وتطلعاتي المهنية.

خلال مسيرتي المهنية، عملت على مشاريع متعددة ساهمت في تطوير مهاراتي في {current_user.skills أو "التقنيات الحديثة"}، وأثق بأنني أقدم قيمة مضافة لفريق عملكم.

أتطلع لفرصة مناقشة كيف يمكن لمهاراتي أن تساهم في نجاح شركتكم.

مع خالص التقدير والاحترام،
{current_user.first_name} {current_user.last_name}
{current_user.phone}
{current_user.email}
        """.strip(),
        "generated_at": datetime.now()
    }

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
