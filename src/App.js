import React, { useState } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  // Function to handle video upload
  const handleVideoUpload = (event) => {
    const uploadedFiles = event.target.files;
    const newVideos = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const video = {
        id: Math.random().toString(36).substr(2, 9),
        name: uploadedFiles[i].name,
        url: URL.createObjectURL(uploadedFiles[i])
      };
      newVideos.push(video);
    }
    setVideos(prevVideos => [...prevVideos, ...newVideos]);
  };

  // Function to handle video click
  const handleVideoClick = (video) => {
    // Implement functionality to play video in a popup
    alert(`Playing video: ${video.name}`);
  };

  // Function to handle bookmark toggle
  const toggleBookmark = (video) => {
    if (bookmarks.some(item => item.id === video.id)) {
      setBookmarks(prevBookmarks => prevBookmarks.filter(item => item.id !== video.id));
    } else {
      setBookmarks(prevBookmarks => [...prevBookmarks, video]);
    }
  };

  // Function to toggle showing only bookmarked videos
  const toggleShowBookmarkedOnly = () => {
    setShowBookmarkedOnly(prevState => !prevState);
  };

  // Function to filter videos based on bookmark status
  const filterVideos = () => {
    if (showBookmarkedOnly) {
      return videos.filter(video => bookmarks.some(item => item.id === video.id));
    }
    return videos;
  };

  return (
    <div className=' w-full h-screen bg-slate-800'>
      <h1 className='pt-10 text-center text-5xl font-serif font-[500] text-slate-300'>Video Library</h1>
      <div className='w-full flex gap-6'>
        <div className=' w-[40%] h-fit pt-28 flex gap-3'>
          <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className='block font-serif h-7 mx-auto w-[4 0%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ' id="file_input"/>
          <button onClick={toggleShowBookmarkedOnly} className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            {showBookmarkedOnly ? 'Show All Videos' : 'Show Bookmarked Only'}
          </button>
        </div>
        
      </div>
      <div className='w-full mx-auto  max-h-screen'>
          <ul className=' pt-12  flex pl-36 gap-5 flex-col'>
            {filterVideos().map(video => (
              <li key={video.id} className=' flex gap-2'>
                <span className=' text-slate-300 font-serif font-[400] text-lg'>{video.name}</span>
                <button onClick={() => handleVideoClick(video)} className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'>Play</button>
                <button onClick={() => toggleBookmark(video)} className=' text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  {bookmarks.some(item => item.id === video.id) ? 'Unbookmark' : 'Bookmark'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      
    </div>
  );
}

export default App;




