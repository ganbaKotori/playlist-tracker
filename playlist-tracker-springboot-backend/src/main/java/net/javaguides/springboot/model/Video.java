package net.javaguides.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Video {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private int videoId;
	
	@Column(name = "video_url")
	private String videoUrl;
	
	@Column(name = "video_title")
	private String videoTitle;
	
	@Column(name = "video_watched")
	private Boolean videoWatched;

	public String getVideoTitle() {
		return videoTitle;
	}

	public void setVideoTitle(String videoTitle) {
		this.videoTitle = videoTitle;
	}

	public int getVideoId() {
		return videoId;
	}

	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}
	
	public Boolean getVideoWatched() {
		return videoWatched;
	}

	public void setVideoWatched(Boolean videoWatched) {
		this.videoWatched = videoWatched;
	}
	
	
}
