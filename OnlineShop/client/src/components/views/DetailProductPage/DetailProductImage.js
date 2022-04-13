import React, {useState} from 'react'
import ImageGallery from "react-image-gallery"
import { useEffect } from 'react'

function DetailProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if (props.detail.images && props.detail.images.length >0 ) {
            let images = []

            props.detail.images && props.detail.images.length.map((item) => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])
    return (
        <div>
            <ImageGallery items={Images}>

            </ImageGallery>
        </div>
    )
}

export default DetailProductImage