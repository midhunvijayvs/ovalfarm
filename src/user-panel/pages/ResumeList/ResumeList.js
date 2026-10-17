import React, { useEffect, useState, useRef } from 'react'
import './ResumeList.scss'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import ErrorModal from "../../../ErrorModal.js";
import PositiveModal from "../../../PositiveModal.js";
import FixedOverlayLoadingSpinner from "../../../FixedOverlayLoadingSpinner.js"
import $ from 'jquery';
import API from "../../../API.js"


import {fetchResumeDataAndGeneratePdf} from '../../../GeneralFunctions'



const ResumeList = ({ userData, loadUserData }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract 'id' from the URL
    const [data, setData] = useState(null);
    const [filters, setFilters] = useState({
        postcode: null,
        country: null,
        is_premium: null, 
        search_key: null


    });
    const [page, setPage] = useState(1);
    const[pageSize,selectPageSize]=useState(10);




    const [postcodeSelected, selectPostCode] = useState(null);
    const [countrySelected, selectCountry] = useState(null);
    const [isPremiumSelected, setPremium] = useState(false);
    const [searchKey, setSearchKey] = useState(null);

   
    const [isActionModalOpen, setActionModalOpen] = useState(false);
    const [idSelected, setIdSelected] = useState(0);
    const [isDeleteConfModalOpen, setIsDeleteConfModalOpen] = useState(false);

    const [isFilterDropOpen, setFilterDropOpen] = useState([false, false, false]);


  const [message, setMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerSoundOn, setBannerSoundOn] = useState(false)
  const [videoSrc, setVideoSrc] = useState('');

 

  const [opacity, setOpacity] = useState(0);




  useEffect(() => {
    loadTableData();
}, [page,pageSize, filters]);





const loadTableData = () => {
    setData(null);
    setIsMessageModalOpen(false);

    let apiUrl = `/resume-builder/resumes/?page=${page}&page_size=${pageSize}`;
   
    // Loop through the filters object and append selected filters to the apiUrl
    for (let filter in filters) {
        if (filters[filter] !== null) {
            apiUrl += `&${filter}=${filters[filter]}`;
        }
    }

    API.get(apiUrl)
        .then(response => {
            setData(response.data);
            
        })
        .catch(error => {
            setMessage(error.message);
            setIsErrorModalOpen(true);
        });
}



const viewDetails=(id)=>{
  navigate(`/resume-preview/${id}`)
 }
 const editItem=(id)=>{
  navigate(`/resume-edit/${id}`)
 }




  return (
    <div className='resume-list-page'>



      <div className='sec-1'>
       <h3> Resumes List</h3>
        <div className='table-box'>


          
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>email</th>
      <th>Phone number</th>
      <th>Created at</th>
      <th>Updated at</th>
      <th>Action</th>
    </tr>
  </thead>

  <tbody>
  {data&&data.results&&data.results.map((item, index) => {

return (
    <tr key={index}>

                  <td data-th="Id">
                 {item.id}
                  </td>
                  <td data-th="Name">
                 {item.name}
                  </td>
                   <td data-th="Phone">
                 {item.phone}
                  </td>
                  <td data-th="Email">
                  {item.email}
                  </td>
                  
                  <td data-th="Created At">
                  {item.created_at}
                  </td>
                  <td data-th="Updated At">
                  {item.updated_at}
                  </td>
                  <td data-th="More">
                  <div className='action-btn-box'>
                    <button onClick={()=>viewDetails(item.id)}><img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-list/table-view-icon.svg`} /></button>
                    <button onClick={() => { editItem(item.id) }}><img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-list/table-edit-icon.svg`} /></button>
                    <button onClick={() => { setIdSelected(item.id); setIsDeleteConfModalOpen(true) }}><img src={`${process.env.REACT_APP_PUBLIC_IMAGES_URL}/resume-list/table-delete-icon.svg`} /></button>
                  </div>
                  </td>

              </tr>

)})}
  
  </tbody>
</table>
       

       


        </div>
      </div>

      {isLoading && <FixedOverlayLoadingSpinner />}


      <ErrorModal state={isErrorModalOpen} message={message} setterFunction={setIsErrorModalOpen} okClickedFunction={() => navigate("/resume-list")} />
      {isMessageModalOpen && <PositiveModal message={message} setterFunction={setIsMessageModalOpen} okClickedFunction={() => { }} />}

    </div >

  );


}

export default ResumeList