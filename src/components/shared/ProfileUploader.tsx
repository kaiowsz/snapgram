import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"
import { convertFileToUrl } from "@/lib/utils"

type ProfileUploaderProps = {
    fieldChange: (files: File[]) => void;
    mediaUrl: string;
}

const ProfileUploader = ({fieldChange, mediaUrl}: ProfileUploaderProps) => {

    const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles: FileWithPath[]) => {
            fieldChange(acceptedFiles)
            setFileUrl(convertFileToUrl(acceptedFiles[0]))

        }, [fieldChange]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpg", ".png", ".jpeg", ".jfif"]
        }
    })

    return (
    <div {...getRootProps()}>
        <input type="text" {...getInputProps()} className="cursor-pointer" />
        
        <div className="cursor-pointer flex-center gap-4">
            <img src={fileUrl || "/assets/profile-placeholder.svg"} alt="Profile Image" className="rounded-full object-cover object-top h-24 w-24" />

            <p className="text-primary-500 small-regular md:base-semibold">Change profile photo</p>
        </div>
    </div>
    )   
}

export default ProfileUploader