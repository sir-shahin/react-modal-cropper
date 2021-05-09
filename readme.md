## React Modal Cropper
This is a react component that lets you crop images with any size you want. First crop in a modal check how the image is going to be and then post to an endpoint that you want. After post, you going to have 2 requests croppedImage and originalImage.
It works with cropperId so you can use it many times on a page.

### How To Use
Dependencies:  
• Install Axios
```sh
$ npm install axios
```
or
```sh
$ yarn add axios
```
   
• Install Cropperjs
```sh
$ npm install cropperjs
```
Sample:
```<Cropper cropperId='img1'></Cropper>```
   

## Properties

Pass these properties as props to Cropper component.
These values are samples, not the default value.

| property | sample value | descriptions |
| ------ | ------ | ------ |
| endpoint | ``` https://google.com/api/post ``` |Image will be post to this url after submit|
| toWidth | ``` 200 ``` | Cropped image width|
| toHeight | ```200``` | Cropped Image height|
| title | ``` Crop The Image ``` |Title of modal|
| previewImage | ``` /preview.png ``` |Image url for showing before selecting any image|
| circleMode | ```circle``` |Use circle for profile images|
| rounded | ```round``` |Modal and buttons with border radius|
| maxFileSize | ``` 5 ``` |Maximum megabyte image size that is acceptable|
| cancle | ``` cancle ``` |Text of cancle button in modal|
| submit | ``` save ``` |Text of submit button in modal|
  
Powered by Cropper js [https://fengyuanchen.github.io/cropperjs/][df1]