import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const MainComponent = () => {
  const [logoSrc, setLogoSrc] = useState('');
  const [productSrc, setProductSrc] = useState('');
  const [logoAngle, setLogoAngle] = useState(0); // State for logo rotation
  const productRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductUpload = (event) => {
    console.log(event , "event")
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleCapture = () => {
    if (productRef.current) {
      html2canvas(productRef.current).then((canvas) => {
        const screenshotDataUrl = canvas.toDataURL('image/png');
        // console.log(screenshotDataUrl , "conevrt base 64")
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshotDataUrl;
        downloadLink.download = 'product-with-logo.png';
        downloadLink.click();
      });
    }
  };

  const handleAngleChange = (event) => {
    setLogoAngle(parseFloat(event.target.value) || 0);
  };

  return (
    <div>
      <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleProductUpload}
        // style={{ display: 'none' }} // Hide the input element
      />
      <button onClick={handleButtonClick}>Add</button>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>

      <div>
        <label>
          Logo Rotation (degrees):
          <input
            type="number"
            value={logoAngle}
            onChange={handleAngleChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <div
        ref={productRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
          backgroundImage: `url(${productSrc})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          // backgroundColor:'red'
        }}
      >
     {/* <img style={{height:'100%',width:'100%',zIndex :'10',position: 'relative',}} src={`${productSrc}`} alt="Product Image" /> */}

        {logoSrc && (
          <Draggable>
            <ResizableBox
              width={150}
              height={150}
              minConstraints={[50, 50]}
              maxConstraints={[300, 300]}
              style={{
                position: 'absolute',
                transform: `rotate(${logoAngle}deg)`,
                transformOrigin: 'top left',
                display: 'inline-block', // Ensure the ResizableBox fits the content
                zIndex :'0',
              }}
            >
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: `rotate(-${logoAngle}deg)`, // Counter-rotate to keep the image upright
              }}>
                <img
                  src={logoSrc}
                  alt="Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
            </ResizableBox>
          </Draggable>
        )}
      </div>

      <button onClick={handleCapture}>Capture Screenshot</button>
    </div>
  );
};

export default MainComponent;
