package ro.ubb.mp.service.file;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service("fileService")
public class FileServiceImpl implements FileService{
    @Override
    public void saveImageToDisk(MultipartFile file, String fileName) throws IOException {
        final Path imagesFolder = Paths.get("images");

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, imagesFolder.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    @Override
    public ByteArrayResource getFileFromDisk(String fileName) throws IOException {

        final Path filePath = Paths.get("images", fileName);

        return new ByteArrayResource(Files.readAllBytes(filePath));
    }
}
