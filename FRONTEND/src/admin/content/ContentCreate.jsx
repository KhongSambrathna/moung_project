import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ContentCreate() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    coverImage: null,
    headerImage: null
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // To prevent multiple submissions

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple form submissions
    if (submitted) {
      return;
    }

    setLoading(true);
    setSubmitted(true);  // Mark as submitted

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('summary', formData.summary);
    formDataToSend.append('content', content);
    formDataToSend.append('coverImage', formData.coverImage);
    formDataToSend.append('headerImage', formData.headerImage);
    formDataToSend.append('date_published', new Date().toISOString());
    formDataToSend.append('views', 0);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-content`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Content created successfully!');

      // Clear form fields after successful submission
      clearForm();

    } catch (error) {
      console.error('Error uploading content:', error.response?.data || error);
      alert('Failed to create content.');
    } finally {
      setLoading(false);
      setSubmitted(false);  // Reset the submission state for future
    }
  };

  const clearForm = () => {
    // Reset the form and editor
    setFormData({
      title: '',
      summary: '',
      coverImage: null,
      headerImage: null
    });
    setContent('');  // Clear content in the editor
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-lg">
          <div className="float-left m-2">
            <Link to={"/admin/editor/"} className="btn btn-outline btn-sm text-light border-light bg-warning">ត្រឡប់ក្រោយ</Link>
          </div>
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0 py-4">បង្កើត</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">ចំណងជើង :</label>
                  <input 
                    type="text"
                    id="title"
                    name="title"
                    className="form-control rounded-pill"
                    autoComplete="off"
                    placeholder="បញ្ជូលចំណងជើង..."
                    onChange={handleChange}
                    value={formData.title}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="summary" className="form-label">សង្ខេប :</label>
                  <input 
                    type="text"
                    id="summary"
                    name="summary"
                    className="form-control rounded-pill"
                    autoComplete="off"
                    placeholder="បញ្ជូលការសង្ខេប..."
                    onChange={handleChange}
                    value={formData.summary}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="coverImage" className="form-label">រូបក្រប 400x200 :</label>
                  <input 
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="headerImage" className="form-label">រូបខាងលើមាតិកា 800x530 :</label>
                  <input 
                    type="file"
                    id="headerImage"
                    name="headerImage"
                    className="form-control"
                    onChange={handleFileChange}
                    accept="image/*" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">មាតិកា :</label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                  />
                </div>
                <div className="text-right">
                <button 
                    type="button" 
                    className="btn btn-lg btn-danger rounded-pill px-5 ms-3 mr-3" 
                    onClick={clearForm}
                  >
                    Clear
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-lg btn-success rounded-pill px-5" 
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Post'}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCreate;
