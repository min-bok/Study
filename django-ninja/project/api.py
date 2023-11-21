from ninja import NinjaAPI, Schema

api = NinjaAPI()

class HelloSchema(Schema):
    name: str = "world"

@api.post("/hello")
def hello(request,  data: HelloSchema):
    return f"Hello {data.name}"

@api.get("/math/{a}and{b}")
def math(request, a:int, b:int):
    return {"add": a + b, "multiply": a * b}

class UserSchema(Schema):
    username:str
    is_authenticated:bool
    # 인증되지 않은 사용자는 다음의 필드를 가지지않으므로 기본값이 필요
    email:str = None
    first_name:str = None
    last_name:str = None

class Error(Schema):
    msg:str

@api.get("/me", response={200: UserSchema, 403: Error})
def me(request):
    if not request.user.is_authenticated:
        return 403, {"msg":"Please sign in first"}
    return request.user