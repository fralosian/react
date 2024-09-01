import loading from '../../img/loading.svg'

function Loading() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img className="w-12" src={loading} alt='Loading' />
        </div>
    )
}

export default Loading
