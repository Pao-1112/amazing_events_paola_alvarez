
let interfazApi = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(interfazApi)

    .then(response => response.json())
    .then(data => {
        console.log(data)

        const tables = document.getElementById("table1")
        const event = data.events
        console.log(event)
        enterTable1(event,tables)

        const tables2 = document.getElementById("table2")
        const tables3 = document.getElementById("table3")
        
        
        calculateProfit(event.filter(element => element.assistance),"Food",tables2)
        calculateProfit(event.filter(element => element.estimate),"Food",tables2)

        enterTable2(event.filter(element => element.estimate),tables2)
        enterTable2(event.filter(element => element.assistance),tables3)

    })
    .catch(error => console.log(error))

function enterTable1(array, container) {

    let greaterCapacity = array.reduce((event1, event2) => {
        if (event1.capacity > event2.capacity) return event1
        return event2
    })
    console.log(greaterCapacity)

    let greaterAttendance = array.filter(element => element.assistance).reduce((event1, event2) => {
        if ((event1.assistance / event1.capacity) > (event2.assistance / event2.capacity)) return event1
        return event2
    })
    console.log(greaterAttendance)

    let minorAttendance = array.filter(element => element.assistance).reduce((event1, event2) => {
        if ((event1.assistance / event1.capacity) < (event2.assistance / event2.capacity)) return event1
        return event2
    })
    console.log(minorAttendance)

    let trContainer = document.createElement('tr')
    trContainer.innerHTML = `
      <td class="text-center border border-danger-black">${greaterAttendance.name}: ${greaterAttendance.assistance/greaterAttendance.capacity*100}%</td>
      <td class="text-center border border-danger-black">${minorAttendance.name}: ${minorAttendance.assistance/minorAttendance.capacity*100}%</td>
      <td class="text-center border border-danger-black">${greaterCapacity.name}: ${greaterCapacity.capacity}</td>`
      container.appendChild(trContainer)
}

function calculateProfit (array,nameCategory){

    let arrayFilter = array.filter(element => element.category == nameCategory).reduce((total,event) =>{
        if(event.assistance != undefined) return total += event.price * event.assistance
        return total += event.price * event.estimate
    },0)
    return arrayFilter
}

function enterTable2 (array,container){
//  arreglo de categorias unicas
    let categories = [... new Set(array.map(element => element.category))]

    let fragment = document.createDocumentFragment()

    for(let categoria of categories){
        let trContainer = document.createElement('tr')
        trContainer.innerHTML = `
        <td class="text-center border border-danger-black">${categoria}</td>
        <td class="text-center border border-danger-black">$ ${calculateProfit(array,categoria)}</td>
        <td class="text-center border border-danger-black">${calculateAttendance(array,categoria)}%</td>`
        fragment.appendChild(trContainer)
    }
    container.appendChild(fragment)

}

function calculateAttendance (array,nameCategory){

    let arrayFilter = array.filter(element => element.category == nameCategory).reduce((total,event) =>{
        if(event.assistance != undefined) return total += event.assistance / event.capacity 
        return total += event.estimate / event.capacity
    },0)
    return (arrayFilter * 100 /array.filter(element => element.category == nameCategory).length).toFixed(2)
}
