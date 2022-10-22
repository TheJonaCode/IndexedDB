// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);


request.onupgradeneeded = e => {
    console.log('Actualizacion de base de datos');
    let db = e.target.result;
    db.createObjectStore('heroes', {
        keyPath: 'id'
    })
}