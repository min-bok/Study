from datetime import date
from ninja import NinjaAPI, Schema, UploadedFile, File
from .models import Employee

api = NinjaAPI()

class EmployeeIn(Schema):
    first_name:str
    last_name:str
    department_id:int = None
    birthdate:date = None

# create
@api.post("/create")
def create_employee(req, payload: EmployeeIn, cv: UploadedFile = File(...)):
    payload_dict = payload.dict()
    employee = Employee.objects.create(**payload.dict())
    employee.cv.save(cv.name, cv)
    return {"id": employee.id}