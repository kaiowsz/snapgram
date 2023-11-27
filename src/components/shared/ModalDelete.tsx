import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button"
import { useDeletePost } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";

type ModalDeleteProps = {
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    id: string | undefined;
    post: Models.Document | undefined;
}

const ModalDelete = ({openModal, setOpenModal, post, id}: ModalDeleteProps) => {
    
    const { mutate: deletePost } = useDeletePost();
    const navigate = useNavigate()

    async function handleDeletePost() {
        deletePost({ 
            postId: id || "",
            imageId: post?.imageId
        })

        setOpenModal(!openModal)
        navigate(-1)
    }

    function handleCancelDelete() {
        setOpenModal(false)
    }

    return (
        <div className={`${openModal ? "flex" : "hidden"} justify-center items-center w-full h-full z-10 absolute inset-0`}>
            <div className="modal-container" />
            <div className="w-full flex justify-center items-center absolute">

            </div>
            <div className="flex p-10 rounded-lg gap-4 flex-col bg-black opacity-100 z-30 border-fuchsia-900 border">
                <p>Are you sure you want to delete this post?</p>
                <div className="flex gap-4 justify-end items-end">
                    <Button 
                    className="shad-button_primary"
                    onClick={handleCancelDelete}>
                        No
                    </Button>

                    <Button 
                    className="shad-button_primary"
                    onClick={handleDeletePost}>
                        Yes
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete