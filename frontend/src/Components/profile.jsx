import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Loginpopup';
import Register from './Registerpopup';
import profile from '../profile.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css';
import credit from '../c.svg';
import deleteicon from '../delete.svg';
import download from '../dowalod.svg';
import originalimg from '../b.svg';
import SubscribePopup from './SubscribePopup';


function Profile() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const [userCredit, setUserCredit] = useState(null);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showOriginal, setShowOriginal] = useState(false);
    const previewRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isSubscribePopupOpen, setIsSubscribePopupOpen] = useState(false);


    useEffect(() => {
        const fetchLibrary = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('http://192.168.1.25:5000/api/library', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Failed to fetch library data');
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };

        fetchLibrary();
    }, []);

    const fetchUserCredit = async (token) => {
        try {
            const response = await fetch('http://192.168.1.25:5000/api/credit', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch credit');
            }

            setUserCredit(data.credit);
            setUserEmail(data.email);
        } catch (err) {
            console.error("Failed to fetch credit:", err);
            setUserCredit(null);
            toast.error('Failed to fetch user credit.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserCredit(token);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserEmail(null);
        setUserCredit(null);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://192.168.1.25:5000/api/delete-image/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setImages(images.filter(img => img.id !== id));
                setSelectedImage(null);
                toast.success("Image deleted!");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };



    return (
        <>
            <ToastContainer />
            <nav class="navbar navbar-expand-lg navbar-light bg-light b1">
                <div className='icon-menu'>
                    <div className="Picsart-logo-container ml" onClick={() => navigate('/')}>
                        <img src="https://static.pica-ai.com/_next/static/media/logo_pica_black.77b77ad3.png" alt="logo" className="AIPhoto-Enhancer-logo" />
                    </div>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <div className="Remove-Background-router toggler-icon2" onClick={() => navigate('/')}>
                                <p>Remove Background</p>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className="AI-Photo-Enhancer-router toggler-icon2" onClick={() => navigate('/PhotoEnhancer')}>
                                <p>AI Photo Enhancer</p>
                            </div>
                        </li>

                    </ul>
                    <div className='bn'>
                        <div className="buttons">
                            {userEmail ? (
                                <div className="user-info">
                                    <div className="user-credit-container Photo-Enhancer-background-color" onClick={() => setIsSubscribePopupOpen(true)}>
                                        <span>
                                            <img src={credit} />
                                        </span>
                                        <span className="credit-amount">{userCredit}</span>

                                        {/* Tooltip or hover card */}
                                        <div className="credit-card">
                                            <div className="credit-info">
                                                <div className="credit-icon"><img src={credit} /><span className="highlight">{userCredit}</span> free credits</div></div>
                                            <div className="credit-text">
                                                <div className="credit-count">
                                                    <div className="credit-refresh">Free credits 100</div>
                                                </div>
                                            </div>
                                            <button className="add-credits-button" onClick={() => setIsSubscribePopupOpen(true)}>Add credits</button>
                                        </div>
                                    </div>
                                    <button
                                        className="user-profile-button Photo-Enhancer-background-color"
                                        onClick={() => navigate('/profile')}
                                    >
                                        <img src={profile} alt="user profile" className="user-profile-icon" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button className="register-button" onClick={() => setIsLoginPopupOpen(true)}>Login</button>
                                    <button className="register-button" onClick={() => setIsPopupOpen(true)}>Register</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='nc'>
                    <div className="buttons">
                        {userEmail ? (
                            <div className="user-info">
                                <div className="user-credit-container Photo-Enhancer-background-color">
                                    <span>
                                        <img src={credit} />
                                    </span>
                                    <span className="credit-amount">{userCredit}</span>
                                </div>
                                <button
                                    className="user-profile-button Photo-Enhancer-background-color"
                                    onClick={() => navigate('/profile')}
                                >
                                    <img src={profile} alt="user profile" className="user-profile-icon" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <button className="register-button" onClick={() => setIsLoginPopupOpen(true)}>Login</button>
                                <button className="register-button" onClick={() => setIsPopupOpen(true)}>Register</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <Login
                      show={isLoginPopupOpen}
                      onClose={() => setIsLoginPopupOpen(false)}
                      onLoginSuccess={(token) => {
                        fetchUserCredit(token);
                      }}
            
                    />
                    <Register show={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            <SubscribePopup show={isSubscribePopupOpen} onClose={() => setIsSubscribePopupOpen(false)} />
            <div className='profile-container'>
                <div className='fasd'>
                    <div className='profile-ditels'>
                        <div className='profile-ditels-icon'>
                            <img src={profile} alt="user profile" className="user-profile-icon" />
                        </div>

                        <div className='profile-ditels-credit-container'>
                            <div className='profile-ditels-credit'>
                                <img src={credit} alt='creditIcon' className='background' />
                                <span className="profile-ditels-credit-text">{userCredit}</span>
                                <span className='profile-ditels-credit-textp1'>Credit</span>
                            </div>
                            <p className="c-p1">Daily free credit 100</p>
                            <div className='profile-ditels-email'>
                                <span className="user-email">{userEmail}</span>
                            </div>
                        </div>

                        <div className='profile-ditels-buttons'>
                            <button className="add-credits-button" onClick={() => setIsSubscribePopupOpen(true)}>Add credits</button>
                            <div className="profile-ditels-button-option">
                                <select
                                    value={selectedValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedValue(value);
                                        if (value === 'logout') {
                                            handleLogout();
                                        }
                                    }}
                                    className="add-credits-Settings"
                                >
                                    <option value="">Settings</option>
                                    <option value="clear">Clear data</option>
                                    <option value="delete">Delete my account</option>
                                    <option value="logout">Logout</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='profile-ditels-container'>
                        <div className='librar-container'>
                            <h2>My library</h2>
                        </div>
                        <div className='date-delete-container'>
                            <p>Date</p>
                            <div className='jup'>
                                <button
                                    className="delete-button"
                                    onClick={() => selectedImage && handleDelete(selectedImage.id)}
                                    disabled={!selectedImage}
                                >
                                    <img src={deleteicon} className='delete-icon' alt='deleteicon' />
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        if (!selectedImage) return;

                                        fetch(selectedImage.progressimg_image)
                                            .then(response => response.blob())
                                            .then(blob => {
                                                const url = window.URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.setAttribute('download', 'processed-image.png');
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(url);
                                            })
                                            .catch(() => alert('Failed to download image'));
                                    }}
                                    disabled={!selectedImage}
                                >
                                    <img src={download} className='delete-icon' alt='download' />
                                </button>
                            </div>
                        </div>

                        <div className="librar-img">
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`library-item ${selectedImage?.id === img.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedImage(img);
                                            setShowOriginal(false);

                                            // Scroll only if screen width is <= 820px
                                            if (window.innerWidth <= 820 && previewRef.current) {
                                                previewRef.current.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {img.orignal_image ? (
                                            <img
                                                src={img.orignal_image}
                                                alt={`Processed ${index}`}
                                                className="library-image"
                                            />
                                        ) : (
                                            <p>No processed image</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No images found in your library.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="edit-photo-preview" ref={previewRef}>
                    {/* Only show buttons if image is selected */}
                    {selectedImage && (
                        <div className="delete-buttons-container">
                            <div className="delete-button-container">
                                <button
                                    className="delete-button"
                                    onClick={() => selectedImage && handleDelete(selectedImage.id)}
                                    disabled={!selectedImage}
                                >
                                    <img src={deleteicon} className="delete-icon" alt="deleteicon" />
                                </button>
                            </div>

                            <div className="delete-button-container">
                                <button
                                    className="Originalimg-button"
                                    disabled={!selectedImage || !selectedImage.orignal_image}
                                    onClick={() => setShowOriginal(prev => !prev)}
                                >
                                    <img src={originalimg} className="delete-icon" alt="original icon" />
                                </button>
                            </div>
                        </div>
                    )}
                    {selectedImage ? (
                        <img
                            src={showOriginal ? selectedImage.orignal_image : selectedImage.progressimg_image}
                            alt={showOriginal ? "Original Preview" : "Processed Preview"}
                            className="preview-image"
                        />
                    ) : (
                        <p>Click an image from your library to preview it here.</p>
                    )}
                </div>
            </div>
            <div className="download-button-container">
                <button
                    className="download-button"
                    onClick={() => {
                        if (!selectedImage) return;

                        fetch(selectedImage.progressimg_image)
                            .then(response => response.blob())
                            .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', 'processed-image.png');
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                window.URL.revokeObjectURL(url);
                            })
                            .catch(() => alert('Failed to download image'));
                    }}
                    disabled={!selectedImage}
                >
                    <span className="icon"><img src={download} className="icon2" alt="download" /></span>
                    <span className="download-text">Download</span>
                </button>
            </div>
        </>
    );
}

export default Profile;