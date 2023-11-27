import { Button } from "../ui/button"


const ModalDelete = () => {


    return (
        <div className="flex justify-center items-center w-full h-full z-10 absolute inset-0">
            <div className="modal-container" />
            <div className="w-full flex justify-center items-center absolute">

            </div>
            <div className="flex p-10 rounded-lg gap-4 flex-col bg-black opacity-100 z-30 border-fuchsia-900 border">
                <p>Are you sure you want to delete this post?</p>
                <div className="flex gap-4 justify-end items-end">
                    <Button className="shad-button_primary">No</Button>
                    <Button className="shad-button_primary">Yes</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete