window.onload = function(){
    let quickaddButton = document.querySelector('#QuickAdd');
    let quicAddFormDiv = document.querySelector('#quicaddForm');
    let cancelBtn = document.querySelector('#Cancel');
    let AddBtn = document.querySelector('#AddBtn');

    let fullname = document.querySelector("#fullname");
    let phone= document.querySelector("#phone");
    let address= document.querySelector("#address");
    let email = document.querySelector("#email");
    let city= document.querySelector("#city");

    let addContactDiv = document.querySelector(".addContact");

    

    quickaddButton.addEventListener("click", function(){
        quicAddFormDiv.style.display = "block";
    });
    cancelBtn.addEventListener("click", function(){
        quicAddFormDiv.style.display = "none";
    });

    AddBtn.addEventListener("click", AddToBook);

    addContactDiv.addEventListener("click", removeEntry);


    let addressBook = [];

    class jsonStructure {
        constructor(fullname, phone, address, city, email) {
            this.fullname = fullname;
            this.phone = phone;
            this.address = address;
            this.city = city;
            this.email = email;
        }
    }

    function AddToBook(){
        let isNull = fullname.value !=='' && phone.value !=='' && address.value !=='' && city.value !=='' && email.value !=='';
        if(isNull) {
            let obj = new jsonStructure(fullname.value, phone.value, address.value, city.value,email.value);
            addressBook.push(obj);
            localStorage['newBook'] = JSON.stringify(addressBook);

            quicAddFormDiv.style.display = "none";

            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(event){
        if(event.target.classList.contains('deleteButton')){
            let removeID = event.target.getAttribute('data-id');
            addressBook.splice(removeID, 1);
            localStorage['newBook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm() {
        let formFields = document.querySelectorAll(".formFields");
        for(let i in formFields) {
            formFields[i].value = '';
        }
    }

    function showAddressBook() {
        if(localStorage['newBook'] === undefined) {
            localStorage['newBook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['newBook']);
            addContactDiv.innerHTML = '';
            for (let i in addressBook) {

                let str = '<div class="entry">';
                    str += `<div class="name"><p>${addressBook[i].fullname}</p></div>`;
                    str += `<div class="phone"><p>${addressBook[i].phone}</p></div>`;
                    str += `<div class="address"><p>${addressBook[i].address}</p></div>`;
                    str += `<div class="city"><p>${addressBook[i].city}</p></div>`;
                    str += `<div class="email"><p>${addressBook[i].email}</p></div>`;
                    str += '<div class="del"><a href="" class="deleteButton" data-id="' +  i + '">Delete</a></div>';
                    str += '</div>';
                    addContactDiv.innerHTML += str;
            }
        }
    }
    showAddressBook();
};


