
export function showMensajes(mensaje, type = "ok") {
    Toastify({
        text: mensaje,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "ok" ? 'success' : "red"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
