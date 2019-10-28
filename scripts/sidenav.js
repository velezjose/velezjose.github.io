
$( document ).ready(() => {
    let w = $( window ).width();
    let sideNavHidden = $('#sidenav').prop('hidden');

    if (w <= 949 && sideNavHidden === true) {
        $('#sidenav').prop('hidden', false);
    }

    if (w > 949 && sideNavHidden === false) {
        $('#sidenav').prop('hidden', true);
    }

    $( window ).resize(() => {
        let w = $( window ).width();
        let sideNavHidden = $('#sidenav').prop('hidden');
    
        if (w <= 949 && sideNavHidden === true) {
            $('#sidenav').prop('hidden', false);
        }
    
        if (w > 949 && sideNavHidden === false) {
            $('#sidenav').prop('hidden', true);
        }
    });

});


function openNav() {
    $('#mySidenav').css('display', 'block');
    $('#mySidenav').css('width', '250px');
}

function closeNav() {
    $('#mySidenav').css('width', '0');
}