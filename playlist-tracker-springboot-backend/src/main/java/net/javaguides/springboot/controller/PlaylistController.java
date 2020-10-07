package net.javaguides.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;

import net.javaguides.springboot.model.Playlist;

import net.javaguides.springboot.repository.PlaylistRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class PlaylistController {
	
	@Autowired
	private PlaylistRepository playlistRepository;
	
	@GetMapping("/playlists")
	public List<Playlist> getAllPlaylists(){
		return playlistRepository.findAll();
	}
	
	//create employee rest api
	@PostMapping("playlists")
	public Playlist createPlaylist(@RequestBody Playlist playlist) {
		return playlistRepository.save(playlist);
	}
	
	
	//update employee rest api	
	@PutMapping("/playlists/{id}")
	public ResponseEntity<Playlist> updatePlaylist(@PathVariable Long id, @RequestBody Playlist playlistDetails){
		Playlist playlist = playlistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Playlist with id :" + id + " does not exist!"));
		playlist.setVideoList(playlistDetails.getVideoList());
		Playlist updatedPlaylist = playlistRepository.save(playlist);
		return ResponseEntity.ok(updatedPlaylist);
	}
	
	//update employee rest api	
		@PutMapping("/playlists/last-video/{id}")
		public ResponseEntity<Playlist> updateIndexOfLastVideoWatched(@PathVariable Long id, @RequestBody Playlist playlistDetails){
			Playlist playlist = playlistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Playlist with id :" + id + " does not exist!"));
			playlist.setIndexOfLastVideoWatched(playlistDetails.getIndexOfLastVideoWatched());
			Playlist updatedPlaylist = playlistRepository.save(playlist);
			return ResponseEntity.ok(updatedPlaylist);
		}
	

}
