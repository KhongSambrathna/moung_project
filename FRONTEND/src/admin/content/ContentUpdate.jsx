import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ContentUpdate() {
  const editor = useRef(null);
  const { contentId } = useParams();
  const [content, setContent] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    coverImage: null,
    headerImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

  useEffect(() => {
    const fetchContent = async () => {
      console.log('Fetching content with ID:', contentId); // Debug log
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/content/${contentId}`);
        setFormData({
          title: response.data.title,
          summary: response.data.summary,
          coverImage: null,
          headerImage: null,
        });
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to fetch content.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true); // Set submission lock

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('summary', formData.summary);
    formDataToSend.append('content', content);

    // Only append files if they are selected
    if (formData.coverImage) {
      formDataToSend.append('coverImage', formData.coverImage);
    }
    if (formData.headerImage) {
      formDataToSend.append('headerImage', formData.headerImage);
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/content/${contentId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error updating content:', error);
      alert('Failed to update content.');
    } finally {
      setIsSubmitting(false); // Release submission lock after the request completes
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-lg">
            <div className="float-left m-2">
              <Link to="/admin/editor/" className="btn btn-outline btn-sm text-light border-light bg-warning">
                ត្រឡប់ក្រោយ
              </Link>
            </div>
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0 py-4">កែប្រែ</h2>
            </div>
            <div className="card-body p-4">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-danger">{error}</p>
              ) : (
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
                    <button type="submit" className="btn btn-lg btn-success rounded-pill px-5">
                      Update Post
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentUpdate;
