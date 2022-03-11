const form = document.getElementById('my-account-form')
console.log('form test:', form)
function handleSubmit (event) {
    event.preventDefault()
    var hash = location.hash.substring(1);
    const destination = `/home_page.html#${hash}`
    location = destination
}
form.addEventListener('submit', handleSubmit)