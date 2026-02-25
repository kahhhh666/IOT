 const tempoaletori = () =>{
     const tempo = document.getElementById("temp").innerText = (Math.random() * 100).toFixed(1) + "°C"
 }
 const distancialeotori = () =>{
     const distancia = document.getElementById("distan").innerText = (Math.random() * 100).toFixed(1) + " cm"
 }
 const umidadealeatori = () =>{
     var umidade = document.getElementById("umi").innerText = (Math.random() * 100).toFixed(1) + " %"
 }
setInterval(tempoaletori,2000)
setInterval(distancialeotori,2000)
setInterval(umidadealeatori,2000)