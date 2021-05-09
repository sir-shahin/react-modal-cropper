import React,{ useState } from "react";
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import axios from 'axios';

const Cropperjs = (props) =>{
    const fileInput = React.createRef();
    const [ imgType ,setImgType] = useState('');
    const [ cropper ,setCropper] = useState('');
    const [ imgBase64 ,setImgBase64] = useState('');
    const [ modalDisplay ,setModalDisplay] = useState('display-none');
    const [ previewImage ,setPreviewImage] = useState(props.previewImage || 'https://static.thenounproject.com/png/1156518-200.png');
    
    const readURL = (element) => {
        let input = element.target;
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            setImgType(input.files[0].type);
            reader.onload = function (e) {
                setImgBase64(e.target.result);
            };
            if(props.maxFileSize){
                if(input.files[0].size >= props.maxFileSize*1000000){
                    alert('File Size Not Acceptable');
                    return false;
                }
            }
            setModalDisplay('display-flex');
            setTimeout(initCropper,1000);
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    };
    const initCropper = () => {
        const image = document.getElementById(props.cropperId);
        setCropper(new Cropper(image, {
            aspectRatio: props.toWidth / props.toHeight,
        }));
    };
    
    async function saveCroppedImage () {
        let croppedImage = await cropper.getCroppedCanvas({
            width: props.toWidth,
            height: props.toHeight
        }).toDataURL(imgType);
        post(croppedImage);
    };
    async function post(final_image) {
        let response = await axios.post(props.endpoint || '/',{
            croppedImage: final_image,
            originalImage: imgBase64
        });
        if(response.status == 200){
            setPreviewImage(final_image);
            resetCropper();
        }
    }
    const resetCropper = () =>{
        document.querySelector('.cropper-container').style.display = "none";
        setModalDisplay('display-none');
        cropper.destroy();
    }

    return(
        <div>
            <img onClick={()=>{fileInput.current.click()}} src={previewImage} width="100%" className={`cursor-pointer rounded-lg shadow bg-gray ${props.circleMode}`}/>
            <input ref={fileInput} type="file" hidden accept=".png, .jpg, .jpeg" onChange={readURL} />
            {/* Modal Start */}
            <div className={`flex-center ${modalDisplay}`}>
                <div className="min-width-210">
                    <div className={`bg-white p-2 ${props.rounded}`}>
                        <div className="p-1">{props.title}</div>
                        <img id={props.cropperId} src={imgBase64} width="300" />
                        <div className="p-1 mt-4 text-right">
                            <span className={`cancle-btn cursor-pointer ${props.rounded}`} onClick={(event)=>{resetCropper(event)}}>{props.cancle || 'Cancle'}</span>
                            <span className={`save-btn cursor-pointer ${props.rounded}`} onClick={(event)=>{saveCroppedImage()}}>{props.submit || 'Save'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .round{
                    border-radius:8px;   
                }
                .bg-white{
                    background-color:white;
                }
                .display-none{
                    display:none
                }
                .cursor-pointer {
                    cursor: pointer;
                }
                .rounded-lg {
                    border-radius: 0.5rem;
                }
                .rounded-lg.circle{
                    border-radius: 100%;
                }
                .flex-center{
                    position:fixed;
                    top:0;
                    left:0;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.58);
                    z-index:740;
                    width:100%;
                    height:100%;
                }
                .min-width-210{
                    min-width:300px;
                }
                .display-flex{
                    display:flex;
                }
                .p-2 {
                    padding: 0.5rem;
                }
                .p-1 {
                    padding: 0.25rem;
                }
                .mt-4 {
                    margin-top: 1rem/* 16px */;
                }
                .save-btn{
                    background-color:grey;
                    color:white;
                    padding: 4px 13px;
                    margin:5px;
                }
                .cancle-btn{
                    background-color:#ddd;
                    color:black;
                    padding: 4px 13px;
                    margin:5px;
                }
                .save-btn:hover,.cancle-btn:hover{
                    filter:contrast(150%)
                }
                .text-right {
                    text-align: right;
                }
                .shadow {
                    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
                }
                .bg-gray{
                    background-color:#eeeeee;
                }
            `}</style>
        </div>
    );
}
export default Cropperjs;