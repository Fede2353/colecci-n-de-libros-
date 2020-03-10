//Definición de las clases

class Libro {
    constructor(titulo,autor,isbn){
    this.titulo=titulo;
    this.autor=autor
    this.isbn=isbn
    }
}

class GUI {
     static mostrarLibros(){    //no va a ser clase instanciable si no que podemos usar sus métodos de forma directa, para eso utilizamos static antes del nombre de los métodos
        let libros = Datos.traerLibros();
        libros.forEach((libro)=>GUI.agregarLibroLista(libro));
        
    }
    static agregarLibroLista(libro){
        const lista = document.querySelector('#libro-list')
    
        const fila= document.createElement('tr');
        fila.innerHTML = `
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.isbn}</td>
        <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `
        lista.appendChild(fila);
    }

    static eliminarLibro(target){
         if (target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
         }
    }
    
    static mostrarAlerta(mensaje, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(mensaje));
        
        const container = document.querySelector('.container')
        const form = document.querySelector('#libro-form')
        container.insertBefore(div,form);

        setTimeout(() => document.querySelector('.alert').remove(),3000);
    } 
    
    static limpiarCampos(){
          document.querySelector('#titulo').value= '';
          document.querySelector('#autor').value= '';
          document.querySelector('#isbn').value= '';   
        }
}

class Datos{
   static traerLibros(){
     let libros;
     if (localStorage.getItem('libros') === null){
         libros = []
     } else{
         libros = JSON.parse(localStorage.getItem('libros'))
     }
     return libros
   }

   static agregarLibro(libro){
      const libros = Datos.traerLibros();
      libros.push(libro);
      localStorage.setItem('libros', JSON.stringify(libros));

   }

   static removerLibro(isbn){
       const libros = Datos.traerLibros();
       libros.forEach((libro,index)=>{
           if (libro.isbn===isbn){
               libros.splice(index,1);
           }

       });
          localStorage.setItem('libros', JSON.stringify(libros));
    }
}
// carga de la página

document.addEventListener('DOMContentLoaded',GUI.mostrarLibros());

// Añadir/controlar el evento submit, para el botón de agregar libro
document.querySelector('#libro-form').addEventListener('submit', (e)=>{
         e.preventDefault(); //para que no surga ningún problema por si se cancela algo o sucede algo al momento de dar clic o presionar la tecla entrer dentro del formulario
         
   //Obtener los valores de los campos 
   const titulo = document.querySelector('#titulo').value
   const autor = document.querySelector('#autor').value
   const isbn = document.querySelector('#isbn').value
   
   if (titulo === ''|| autor === '' || isbn === ''){
       GUI.mostrarAlerta('Por favor ingrese todos los datos','danger')
   } else {
      const libro = new Libro(titulo,autor,isbn);
      Datos.agregarLibro(libro);
      GUI.agregarLibroLista(libro) 
      GUI.mostrarAlerta('libro agregado a la coleción', 'success')
      GUI.limpiarCampos();

   }
});

document.querySelector('#libro-list').addEventListener('click', (e) =>{

    GUI.eliminarLibro(e.target);
    Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
    GUI.mostrarAlerta('libro eliminado con éxito', 'success')
       
});


