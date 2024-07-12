from django.shortcuts import render

# Create your views here.
def index(request):
    context={}
    return render(request, 'zapateria/index.html', context)

def productos(request):
    context={}
    return render(request, 'zapateria/productos.html', context)