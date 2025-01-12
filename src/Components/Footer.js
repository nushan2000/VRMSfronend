import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{ width: '100%',top:0 }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{ backgroundColor: '#750B1E', color:'white'}}>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='fdsaf' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>

      </section>

      <div >
        
          <MDBRow className='m-3 justify-content-center' style={{ width: '100%' }} >
            <MDBCol md='3' lg='3' xl='3' className='mx-auto mb-5'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='logo' className='me-0' />
              FACULTY OF ENGINEERING UNIVERSITY OF RUHUNA

              </h6>
              <p>
              The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle. First batch of students was admitted on 27th March 2000.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='logo' className='me-0' />
                FACULTY RESERVATION SYSTEM

              </h6>
              <p>
              software aims to streamline vehicle reservations, reduce unnecessary expenses, and enhance overall efficiency within the faculty
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                University of Ruhuna
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Faculty of Engineering
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                ENG-MIS
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Library
                </a>
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-0' />
                Faculty of Engineering<br/>University of Ruhuna,Hapugala,<br/> Galle,<br/>Sri Lanka.<br/> 80000
              </p>
             
            </MDBCol>
            <MDBCol md='2' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              
              
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                ar@eng.ruh.ac.lk
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> +(94) 912245765
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> +(94) 912245766
              </p>
            </MDBCol>
          </MDBRow>
       
      </div>
      <div className='line'></div>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://www.eng.ruh.ac.lk/'>
        Faculty of Engineering, University of Ruhuna
        </a>
      </div>
    </MDBFooter>
  );
}