from django.shortcuts import render
from .models import Usuario, Genero

# Create your views here.
def index(request):
    usuarios=Usuario.objects.all()
    context={"usuarios": usuarios}
    return render(request, 'usuarios/index.html', context)

def crud(request):
    usuarios=Usuario.objects.all()
    context={"usuarios": usuarios}
    return render(request, 'usuarios/usuarios_list.html', context)

def usuariosAdd(request):
    if request.method is not 'POST':
        generos=Genero.objects.all()
        context={"generos":generos}
        return render(request, 'usuarios/usuarios_add.html', context)
    else:
        rut=request.POST["rut"]
        nombre=request.POST["nombre"]
        aPaterno=request.POST["aPaterno"]
        aMaterno=request.POST["aMaterno"]
        fechaNac=request.POST["fechaNac"]
        genero=request.POST["genero"]
        telefono=request.POST["telefono"]
        email=request.POST["email"]
        direccion=request.POST["direccion"]

        objGenero=Genero.objects.get(id_genero=genero)
        obj=Usuario.objects.create( rut=rut,
                                    nombre=nombre,
                                    aPaterno=aPaterno,
                                    aMaterno=aMaterno,
                                    fechaNac=fechaNac,
                                    id_genero=objGenero,
                                    telefono=telefono,
                                    email=email,
                                    direccion=direccion,
                                    activo=1 )
        obj.save()
        context={'mensaje': "OK, datos grabados..."}
        return render(request, 'usuarios/usuarios_add.html', context)