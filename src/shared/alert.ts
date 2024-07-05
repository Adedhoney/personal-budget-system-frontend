import Swal from 'sweetalert2';

export const successMessage = (message: string) => {
    Swal.fire({
        title: 'Success!',
        text: message,
        icon: 'success',
        confirmButtonText: 'Continue',
    });
};
export const errorMessage = (message: string) => {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Continue',
    });
};

export default alert;
