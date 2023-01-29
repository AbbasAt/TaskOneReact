import './styles/path.css'

export default function Path() {
    const pageName = window.location.pathname.split('/')[2];
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            {pageName !== undefined ? <p>Home / <span className='path' data-content={capitalizeFirstLetter(pageName)}>{capitalizeFirstLetter(pageName)}</span></p>
                : <p>Home /</p>
            }
        </>
    )
}