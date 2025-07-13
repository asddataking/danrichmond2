import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiYoutube, FiPlay, FiEye, FiCalendar } from 'react-icons/fi';
import { YOUTUBE_CONFIG } from '../config/youtube';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
  channelTitle: string;
}

interface YouTubeIntegrationProps {
  channelId?: string;
  apiKey?: string;
}

const YouTubeIntegration: React.FC<YouTubeIntegrationProps> = ({ 
  channelId = YOUTUBE_CONFIG.CHANNEL_ID,
  apiKey = YOUTUBE_CONFIG.API_KEY
}) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  // Mock data for development (remove this when you have real API key)
  const mockVideos: YouTubeVideo[] = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'AI Automation: Building the Future of Work',
      description: 'Exploring how AI is transforming the workplace and what it means for the future of employment.',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      publishedAt: '2024-01-15T10:00:00Z',
      viewCount: '15.2K',
      duration: '12:34',
      channelTitle: 'Dan Richmond'
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Drone Footage: Sunset Over the City',
      description: 'Beautiful aerial shots captured with my latest drone setup. Perfect for relaxation and inspiration.',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      publishedAt: '2024-01-10T15:30:00Z',
      viewCount: '8.7K',
      duration: '8:45',
      channelTitle: 'Dan Richmond'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Tech Review: Latest AI Tools for Creators',
      description: 'Reviewing the newest AI tools that are changing how content creators work and create.',
      thumbnail: 'https://images.unsplash.com/photo-1676299258276-5b1d7c4b0c0c?w=800&h=400&fit=crop',
      publishedAt: '2024-01-05T12:15:00Z',
      viewCount: '23.1K',
      duration: '15:22',
      channelTitle: 'Dan Richmond'
    }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
                 // For now, using mock data
         // When you have a real API key, uncomment the code below
         /*
         if (!apiKey || apiKey === YOUTUBE_CONFIG.API_KEY) {
           throw new Error('YouTube API key not configured');
         }

        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=6&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        
        // Get video details for each video
        const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${apiKey}`
        );
        
        const detailsData = await detailsResponse.json();
        
        const videosWithDetails = data.items.map((item: any, index: number) => {
          const details = detailsData.items[index];
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            viewCount: formatViewCount(details.statistics.viewCount),
            duration: formatDuration(details.contentDetails.duration),
            channelTitle: item.snippet.channelTitle
          };
        });
        
        setVideos(videosWithDetails);
        */
        
        // Using mock data for now
        setVideos(mockVideos);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos');
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId, apiKey, mockVideos]);



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400 mb-4">{error}</p>
        <p className="text-gray-400 text-sm">
          Using sample data. Configure YouTube API key for live data.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Video */}
      {videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 p-8 rounded-2xl border border-primary-500/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <FiYoutube className="w-6 h-6 text-red-500" />
            <span className="text-primary-400 text-sm font-medium">Latest Upload</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src={videos[0].thumbnail} 
                alt={videos[0].title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setSelectedVideo(videos[0])}
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <FiPlay className="w-6 h-6 text-white ml-1" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">{videos[0].title}</h3>
              <p className="text-gray-300 leading-relaxed">{videos[0].description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <FiEye className="w-4 h-4" />
                  {videos[0].viewCount} views
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {formatDate(videos[0].publishedAt)}
                </div>
                <span className="bg-dark-700 px-2 py-1 rounded text-xs">
                  {videos[0].duration}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(1).map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <FiPlay className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h4>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{video.viewCount} views</span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-dark-800 rounded-2xl p-6 max-w-4xl w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors duration-200"
              >
                <FiPlay className="w-6 h-6 rotate-90" />
              </button>
            </div>
            
            <div className="aspect-video bg-dark-700 rounded-lg overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiEye className="w-4 h-4" />
                {selectedVideo.viewCount} views
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                {formatDate(selectedVideo.publishedAt)}
              </div>
              <span className="bg-dark-700 px-2 py-1 rounded text-xs">
                {selectedVideo.duration}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default YouTubeIntegration; 