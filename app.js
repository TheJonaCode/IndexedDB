// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);


request.onupgradeneeded = e => {
    console.log('Actualizacion de base de datos');
    let db = e.target.result;
    db.createObjectStore('heroes', {
        keyPath: 'id'
    })
}

//Manejo de errores
request.onerror = e => {
    console.log('DB error: ', e.target.error);
}

//Insertar datos 
request.onsuccess = e => {
    let db = e.target.result;
    let heroesData = [
        { id: '111', heroe: 'Spiderman', mensaje: 'Aquí Spiderman' },
        { id: '222', heroe: 'Hulk', mensaje: 'Aquí Hulk' },
        { id: '222', heroe: 'Ironman', mensaje: 'Aquí Ironman' }
    ];
    let heroesTransaction = db.transaction('heroes', 'readwrite');
    heroesTransaction.onerror = e => {
        console.log('Error guardado', e.target.error);
    };
    //Informa sobre el éxito de la transacción
    heroesTransaction.oncomplete = e => {
        console.log('Transacción Hecha', e);
    };
    let heroesStore = heroesTransaction.objectStore('heroes');
    for (let heroe of heroesData) {
        heroesStore.add(heroe);
    };
    heroesStore.onsuccess = e => {
        console.log('Nuevo item agregado');
    };
}