class Libro {
   constructor(nombre,autor,isbn){
   this.nombre=nombre
   this.autor=autor
   this.isbn=isbn 
   }

}

class GUI{
   static mostrarAlerta(mensaje, clas){
        const div = document.createElement('div')
        div.className= clas
        div.appendChild(document.createTextNode(mensaje))

        const container= document.querySelector('.container')
        const form= document.getElementById('libro-form')
   
        container.insertBefore(div,form)       
        
        setTimeout(() =>  document.querySelector('.alert').remove(),3000);
}
   static agregarLibro(libro){
        const lista = document.getElementById('libro-list')
        const fila = document.createElement('tr')
        fila.innerHTML = `
        <td>${libro.nombre}</td>
        <td>${libro.autor}</td>
        <td>${libro.isbn}</td>
        <td><btn class = "delete">X</btn></td> `
        
       
        lista.appendChild(fila)
   }
   static limpiarCampos(){
         document.querySelector('#titulo').value=''
         document.querySelector('#autor').value=''
         document.querySelector('#isbn').value=''
}

   static eliminarLibro(target){
     if (target.classList.contains('delete')){
       target.parentElement.parentElement.remove()

     }
   }

   static mostrarLibros(){
      const libros = Datosls.traerlibros();
      libros.forEach((libro) => GUI.agregarLibro(libro));
   }


}
class Datosls{
    

    static traerlibros(){
        let libros 
        if (localStorage.getItem('libros')=== null){
            libros = []
        } else {
            libros = JSON.parse(localStorage.getItem('libros'));    
        }
        return libros 
    }

    static agregarLibro(libro){
        let libros = Datosls.traerlibros();
        libros.push(libro)
        localStorage.setItem('libros',JSON.stringify(libros))

    }
    
    static eliminarLibro(isbn){
     let libros = Datosls.traerlibros()
     libros.forEach((libro,index)=>{
       if (libro.isbn === isbn){
          libros.splice(index,1)   
       }
     })
       localStorage.setItem('libros',JSON.stringify(libros));
    }
    
}

document.addEventListener('DOMContentLoad',GUI.mostrarLibros())




document.querySelector('#libro-form').addEventListener('submit', (e)=>{
   e.preventDefault();
   const nombre= document.querySelector('#titulo').value
   const autor=document.querySelector('#autor').value
   const isbn=document.querySelector('#isbn').value
   
   if (nombre==='' || autor===''|| isbn === ''){
        GUI.mostrarAlerta('Por favor ingrese todos los campos', 'alert alert-danger') 
   } else {
   
   const libro = new Libro(nombre,autor,isbn)
   Datosls.agregarLibro(libro)
   GUI.agregarLibro(libro);
   GUI.mostrarAlerta('libro agregado', 'alert alert-success')
   GUI.limpiarCampos()
}
})

document.querySelector('#libro-list').addEventListener('click',(e)=>{
    Datosls.eliminarLibro(e.target.parentElement.previousElementSibling.textContent)
    GUI.eliminarLibro(e.target)
    GUI.mostrarAlerta('libro eliminado con éxito', 'alert alert-success')
    
})




