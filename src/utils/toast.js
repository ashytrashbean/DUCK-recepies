import Toastify from 'toastify-js'

export function showToast(message, isError = false){
    Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    style: {
        background: isError ? '#c0392b' : '#27ae60',},
    }).showToast();
}