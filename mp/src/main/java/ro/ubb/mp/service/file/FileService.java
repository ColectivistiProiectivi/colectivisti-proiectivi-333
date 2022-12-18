package ro.ubb.mp.service.file;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    void saveImageToDisk(MultipartFile file, String fileName) throws IOException;

    ByteArrayResource getFileFromDisk(String fileName) throws IOException;
}
