
 class Cyborg {
     constructor({ data, cyborgSelector }) {
         this._name = `${data.name.first} ${data.name.last}`;
         this._model = `${data.id.name} ${data.id.value}`;
         this._gender = `gender: ${data.gender}`;
         this._age = `age: ${data.registered.age}`;
         this._Location = `Location: ${data.location.city}. ${data.location.country}`;
         this._point = `Access point: ${data.email}`;
         this._password = `Access password: ${data.login.password}`;
         this._link = data.picture.large;
         this._cyborgSelector = cyborgSelector;
     }

     _getTemplate() {
         const cyborgElement = document
             .querySelector(this._cyborgSelector)
             .content.querySelector('.cyborg')
             .cloneNode(true);
         return cyborgElement;
     }


     generateCyborg() {
         this._element = this._getTemplate();
         this._cyborgAvatar = this._element.querySelector('.cyborg__avatar');
         this._cyborgName = this._element.querySelector('.name');
         this._cyborgModel = this._element.querySelector('.model');
         this._cyborgGender = this._element.querySelector('.gender');
         this._cyborgAge = this._element.querySelector('.age');
         this._cyborgLocation = this._element.querySelector('.location');
         this._cyborgAccessPoint = this._element.querySelector('.point');
         this._cyborgAccessPassword = this._element.querySelector('.password');
         this._cyborgAvatar.src = this._link;
         this._cyborgAvatar.alt = this._name;
         this._cyborgName.textContent = this._name;
         this._cyborgModel.textContent = this._model;
         this._cyborgGender.textContent = this._gender;
         this._cyborgAge.textContent = this._age;
         this._cyborgLocation.textContent = this._Location;
         this._cyborgAccessPoint.textContent = this._point;
         this._cyborgAccessPassword.textContent = this._password;
         return this._element;
     }
 }

 class Section {
     constructor({ items, renderer }, container) {
         this._items = items;
         this._renderer = renderer;
         this._container = container;
     }

     renderItems() {
         this._items.forEach((item) => this._renderer(item));
     }

     addItem(item) {
         this._container.prepend(item);
     }
 }


const cyborgSection = $('.elements');
let createdCyborgs = null
let cyborgList

$( "form" ).submit(function(event) {
    event.preventDefault();
    const quantity = $( "input" ).first().val()
    if (quantity !== '0') {
        $.ajax({
            url: `https://randomuser.me/api/?results=${quantity}`,
            dataType: 'json',
            success: function (data) {
                $('.terminal__ofline').remove()
                createdCyborgs = data.results
                paginate(createdCyborgs,1)
                $(function() {
                    $('.pagination-sm').pagination({
                        items: createdCyborgs.length,
                        itemsOnPage: 10,
                        cssStyle: 'light-theme',
                        onPageClick: function (pageNumber) {
                            paginate(createdCyborgs, pageNumber)
                        }
                    });
                });
            }
        });
    }
});

function createCyborg(data) {
    const cyborg = new Cyborg({
        data: data,
        cyborgSelector: '.cyborg-template'
    });
    const cyborgElement = cyborg.generateCyborg();
    return cyborgElement;
}

 function onPageClick(pageNumber, event) {
    console.log(pageNumber)
 }

 function paginate(array, page_number) {
     $('.cyborg').remove()
     const cyborgData = array.slice((page_number - 1) * 10, page_number * 10);
     cyborgData.reverse()
     cyborgList = new Section(
         {
             items: cyborgData,
             renderer: (item) => {
                 const cyborgElement = createCyborg(item);
                 cyborgList.addItem(cyborgElement);},
         },
         cyborgSection,
     );
     cyborgList.renderItems();
 }




