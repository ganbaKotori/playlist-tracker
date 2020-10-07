package net.javaguides.springboot.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name= "playlists")
public class Playlist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long playlistId;
	
	@Column(name = "playlist_title")
	private String title;
	
	@Column(name = "playlist_url")
	private String url;
	
	@Column(name = "playlist_length")
	private int length;
	
	@Column(name = "num_video_completed")
	private int numOfVideosCompleted;
	
	@Column(name = "index_last_video_watched")
	private int indexOfLastVideoWatched;
	
	@Column(name = "author")
	private String author;
	
	@OneToMany(cascade = CascadeType.ALL, fetch= FetchType.LAZY)
	@JoinColumn(name = "playlist_id",referencedColumnName="playlistId")
	private List<Video> videoList = new ArrayList<>();
	

	public Playlist() {
	}

	public Playlist(String title, String url, int length, int numOfVideosCompleted,
			int indexOfLastVideoWatched, String author) {
		super();
		this.title = title;
		this.url = url;
		this.length = length;
		this.numOfVideosCompleted = numOfVideosCompleted;
		this.indexOfLastVideoWatched = indexOfLastVideoWatched;
		this.author = author;
	}
	
	public List<Video> getVideoList() {
		return videoList;
	}

	public void setVideoList(List<Video> videoList) {
		this.videoList = videoList;
	}
	
	public long getId() {
		return playlistId;
	}
	public void setId(long playlistId) {
		this.playlistId = playlistId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public int getNumOfVideosCompleted() {
		return numOfVideosCompleted;
	}
	public void setNumOfVideosCompleted(int numOfVideosCompleted) {
		this.numOfVideosCompleted = numOfVideosCompleted;
	}
	public int getIndexOfLastVideoWatched() {
		return indexOfLastVideoWatched;
	}
	public void setIndexOfLastVideoWatched(int indexOfLastVideoWatched) {
		this.indexOfLastVideoWatched = indexOfLastVideoWatched;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	
	
}
