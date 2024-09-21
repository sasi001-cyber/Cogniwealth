import React, { useContext, useEffect, useState } from 'react';
import "../css/DataSelection.css";
import { imageLinks } from "../data";
import axios from 'axios';
import FinanceImages from './FinanceImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faGears } from '@fortawesome/free-solid-svg-icons';
import { Context } from './Context';

function DataSelection() {
  
  console.log("DataSelection");

  const {selectedData, setSelectedData,isClicked, setIsClicked} = useContext(Context); // Use lowercase for consistency
 

  

  function generate() {
    setIsClicked(true);
    

  
    const uniqueData = Array.from(new Set(selectedData)); 
    give(uniqueData); 
  }

  const handleImageClick = (link) => {
    setSelectedData((prevData) => {
      const updatedData = [...prevData];
      const index = updatedData.indexOf(link);

      if (index !== -1) { 
        updatedData.splice(index, 1);
      } else { 
        updatedData.push(link);
      }

      return updatedData;
    });
  };

  const give = async (urls) => {
    try {
      const response = await axios.post("http://localhost:5000/process-urls", {urls});
      console.log("JS",response); // Handle successful response (e.g., show success message)
    } catch (error) { 
      console.error(error); 
    }
  };

  useEffect(() => {
   
      give(selectedData); 
    
  }, [isClicked]); 
  return (
   
      
      <div className="data-container" id='wealthtool'>

        <h2>Select Your <span style={{ color: "#E0C766" }}>OWN</span> data to be loaded</h2>
        <div className="data-images-container">
          
            {imageLinks.map((item) => (
              <a
                key={item.item} // Add a unique key for each item
                style={{
                  border: selectedData.includes(item.item) ? "5px dashed #14cb2d" : "none", // Gold border
                  borderRadius: "10px", 
                  padding:"1px",
                  width: "max-content",
                }}
                className="finance-images"
                onClick={() => handleImageClick(item.item)}
              >
               <div className="varisu"> <FinanceImages image={item.src} /></div>
              </a>
            ))}
         
        </div>
        <div className='forward-backward'>
        <a className="btn btn-go" onClick={generate}>
          Process <FontAwesomeIcon icon={faGears} />
        </a>
        
        </div>
      </div>
     
    );
}

export default DataSelection;

