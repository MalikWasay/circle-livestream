# Circle Livestream - Self-Hosted Live Streaming Feature

A complete self-hosted live streaming solution built with Node.js, Sequelize, and Node-Media-Server for HLS streaming.

## Features

- ✅ Create and manage live streams
- ✅ RTMP ingest with HLS output
- ✅ Stream status management (pending, live, ended)
- ✅ User authentication and stream joining
- ✅ RESTful API endpoints
- ✅ Self-hosted infrastructure

## Architecture

The system consists of two main components:

1. **Node.js Backend API** - Manages streams, users, and provides REST endpoints
2. **Streaming Server** - Handles RTMP ingest and converts to HLS segments

## Prerequisites

- Node.js 16+ 
- MySQL/PostgreSQL database
- FFmpeg installed on the streaming server
- VPS or cloud server for streaming (DigitalOcean, AWS EC2, etc.)

## Installation

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd circle-livestream
npm install
```

### 2. Environment Configuration

Create environment files in the `envs/` directory:

```bash
# .env.dev.circle.api
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_MIN_CON=0
DB_MAX_CON=5
PORT=3000
API_URL=/api
STREAM_SERVER_URL=http://your-streaming-server:8000

# For streaming server
RTMP_PORT=1935
HTTP_PORT=8000
FFMPEG_PATH=/usr/bin/ffmpeg
API_USER=admin
API_PASS=your_secure_password
SECRET=your_secret_key
```

### 3. Database Setup

```bash
# Run migrations
npm run migrate:dev

# Or for production
npm run migrate:prod
```

## Running the Application

### Start the Backend API

```bash
# Development
npm run dev

# Production
npm run start
```

### Start the Streaming Server

```bash
# In a separate terminal
npm run media
```

## API Endpoints

### Authentication
All endpoints require authentication via the `authenticationMiddleware()`.

### Stream Management

#### Create Stream
```http
POST /api/livestream/streams
Content-Type: application/json

{
  "title": "My Live Stream"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My Live Stream",
    "stream_key": "uuid-here",
    "playback_url": "http://server:8000/live/uuid-here/index.m3u8",
    "status": "pending",
    "user_id": 1
  },
  "message": "Stream created successfully"
}
```

#### Get All Streams
```http
GET /api/livestream/streams
```

#### Get Stream by ID
```http
GET /api/livestream/streams/:id
```

#### Get Stream by Key
```http
GET /api/livestream/streams/key?streamKey=uuid-here
```

#### Update Stream Status
```http
PATCH /api/livestream/streams/:id/status
Content-Type: application/json

{
  "status": "live"
}
```

#### Start Stream
```http
POST /api/livestream/streams/:id/start
```

#### End Stream
```http
POST /api/livestream/streams/:id/end
```

#### Join Stream
```http
POST /api/livestream/streams/join
Content-Type: application/json

{
  "streamRefNo": "stream-reference-number"
}
```

#### Get Stream Participants
```http
GET /api/livestream/streams/:id/participants
```

## Streaming Setup

### RTMP Push URL
```
rtmp://your-server:1935/live/stream-key
```

### HLS Playback URL
```
http://your-server:8000/live/stream-key/index.m3u8
```

### Broadcasting Software
- **OBS Studio**: Add RTMP stream with the push URL
- **Streamlabs**: Use the same RTMP configuration
- **Mobile Apps**: Use apps that support RTMP streaming

## Frontend Integration

### Web (HLS.js)
```javascript
import Hls from 'hls.js';

useEffect(() => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(document.getElementById('video'));
  }
}, [streamUrl]);
```

### React Native
```javascript
import Video from 'react-native-video';

<Video
  source={{ uri: 'http://your-server:8000/live/stream-key/index.m3u8' }}
  controls={true}
  style={{ width: '100%', height: 300 }}
/>
```

## Deployment

### Backend API
Deploy to:
- Heroku
- Render
- AWS Elastic Beanstalk
- DigitalOcean App Platform

### Streaming Server
**Must be deployed on a VPS with:**
- Open ports 1935 (RTMP) and 8000 (HTTP)
- FFmpeg installed
- Sufficient bandwidth for streaming

**Recommended VPS Providers:**
- DigitalOcean
- Linode
- Vultr
- AWS EC2

### Environment Variables for Production
```bash
# Backend
NODE_ENV=production
STREAM_SERVER_URL=https://your-streaming-domain.com

# Streaming Server
RTMP_PORT=1935
HTTP_PORT=8000
FFMPEG_PATH=/usr/bin/ffmpeg
API_USER=your_secure_username
API_PASS=your_secure_password
SECRET=your_secure_secret
```

## Monitoring and Maintenance

### Logs
- Backend logs are available via the logger
- Streaming server logs show connection events
- Monitor disk space for HLS segments

### Health Checks
```http
GET /health
```

### Performance
- HLS segments are automatically cleaned up
- Consider CDN for high-traffic streams
- Monitor server resources during live streams

## Troubleshooting

### Common Issues

1. **FFmpeg not found**: Install FFmpeg on the streaming server
2. **Port conflicts**: Ensure ports 1935 and 8000 are available
3. **Database connection**: Verify database credentials and connectivity
4. **Stream not starting**: Check RTMP push URL and stream key

### Debug Mode
Enable detailed logging by setting environment variables:
```bash
DEBUG=node-media-server:*
```

## Security Considerations

- Use HTTPS for production
- Implement rate limiting
- Secure API keys and secrets
- Regular security updates
- Monitor for abuse

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Your License Here]

## Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation
