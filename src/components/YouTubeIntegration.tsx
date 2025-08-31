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
  const [video, setVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Mock data for development (remove this when you have real API key)
  const mockVideo: YouTubeVideo = {
    id: 'dQw4w9WgXcQ',
    title: 'AI Automation: Building the Future of Work',
    description: 'Exploring how AI is transforming the workplace and what it means for the future of employment.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    publishedAt: '2024-01-15T10:00:00Z',
    viewCount: '15.2K',
    duration: '12:34',
    channelTitle: 'Dan Richmond'
  };

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        setLoading(true);
        
        console.log('YouTube Integration Debug:', {
          apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined',
          channelId: channelId || 'undefined',
          hasValidApiKey: apiKey && apiKey !== 'YOUR_YOUTUBE_API_KEY',
          hasValidChannelId: channelId && channelId !== 'UCYOUR_CHANNEL_ID'
        });
        
        // Check if we have valid API credentials
        if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY' || !channelId || channelId === 'UCYOUR_CHANNEL_ID') {
          console.log('Using mock data - API credentials not configured');
          setVideo(mockVideo);
          setLoading(false);
          return;
        }

        // Fetch latest video from YouTube API
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=1&key=${apiKey}`;
        
        console.log('Fetching from YouTube API:', searchUrl);
        
        const response = await fetch(searchUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('YouTube API Error Response:', errorText);
          throw new Error(`Failed to fetch video from YouTube API: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        console.log('YouTube API Response:', data);
        
        if (data.error) {
          throw new Error(`YouTube API Error: ${data.error.message || 'Unknown error'}`);
        }
        
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          
          // Get video details including statistics and duration
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${item.id.videoId}&key=${apiKey}`;
          
          const detailsResponse = await fetch(detailsUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (!detailsResponse.ok) {
            const errorText = await detailsResponse.text();
            console.error('YouTube Details API Error Response:', errorText);
            throw new Error(`Failed to fetch video details: ${detailsResponse.status} ${detailsResponse.statusText}`);
          }
          
          const detailsData = await detailsResponse.json();
          
          console.log('YouTube Details API Response:', detailsData);
          
          if (detailsData.error) {
            throw new Error(`YouTube Details API Error: ${detailsData.error.message || 'Unknown error'}`);
          }
          
          const details = detailsData.items[0];
          
          const videoData = {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            viewCount: formatViewCount(details.statistics.viewCount),
            duration: formatDuration(details.contentDetails.duration),
            channelTitle: item.snippet.channelTitle
          };
          
          setVideo(videoData);
        } else {
          throw new Error('No videos found for this channel');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('YouTube API Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch video');
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, [channelId, apiKey]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatViewCount = (viewCount: string) => {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatDuration = (duration: string) => {
    // Parse ISO 8601 duration format (PT4M13S -> 4:13)
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <motion.div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm mb-4">
          {error || 'No video available'}
        </p>
        <a 
          href={YOUTUBE_CONFIG.CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
        >
          <FiYoutube className="w-4 h-4" />
          Visit Channel
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Latest Video Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
      >
        {/* Video Thumbnail */}
        <div className="relative group cursor-pointer" onClick={() => setShowVideo(true)}>
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
            >
              <FiPlay className="w-6 h-6 text-white ml-1" />
            </motion.div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        
        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{video.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                {video.viewCount}
              </div>
              <div className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {formatDate(video.publishedAt)}
              </div>
            </div>
            <FiYoutube className="w-4 h-4 text-red-500" />
          </div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-2xl p-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{video.title}</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors duration-200"
              >
                <FiPlay className="w-5 h-5 rotate-90" />
              </button>
            </div>
            
            <div className="aspect-video bg-slate-700 rounded-lg overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                title={video.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{video.description}</p>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <FiEye className="w-3 h-3" />
                {video.viewCount} views
              </div>
              <div className="flex items-center gap-1">
                <FiCalendar className="w-3 h-3" />
                {formatDate(video.publishedAt)}
              </div>
              <span className="bg-slate-700 px-2 py-1 rounded text-xs">
                {video.duration}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default YouTubeIntegration; 