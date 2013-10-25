/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/

/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

function render(entries) {
    var template = $('.template');
    var addressBook = $('.address-book');
    var instance;
    addressBook.empty();
    $.each(Employees.entries, function(){
        instance = template.clone();
        //$.each(prop, function() {
        for (prop in this) { 
            if (prop === 'pic') {
                instance.find('.pic').attr({
                    src: this[prop],
                    alt: 'Picture of ' + this.first + ' ' + this.last
                });
            } else {
                instance.find('.' + prop).html(this[prop]);
            }
            //instance.find('.first').html(this.first);
            //instance.find('.last').html(this.last);    
            //instance.find('.title').html(this.title);
            //instance.find('.department').html(this.department);
            
            instance.removeClass('template');
            addressBook.append(instance);
        }
    });
}

$(function() {
   sortObjArray(Employees.entries, 'last');
   render(Employees);             
});