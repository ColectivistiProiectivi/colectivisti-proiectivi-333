package ro.ubb.mp.dao.model;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;

@Table
@Data
@Builder
@Entity(name = "messages")
public class Message {
    @Id
    private int id;
    @Column
    private String sender;
    @Column
    private String reciever;
    @Column
    private String content;
    @Column
    private LocalDateTime time;

    public Message() {
    }

    public Message(int id,String sender, String reciever, String content, LocalDateTime time) {
        this.id=id;
        this.sender = sender;
        this.reciever = reciever;
        this.content = content;
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReciever() {
        return reciever;
    }

    public void setReciever(String reciever) {
        this.reciever = reciever;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(sender, message.sender) && Objects.equals(reciever, message.reciever) && Objects.equals(content, message.content) && Objects.equals(time, message.time);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id,sender, reciever, content, time);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender='" + sender + '\'' +
                ", reciever='" + reciever + '\'' +
                ", content='" + content + '\'' +
                ", time=" + time +
                '}';
    }
}
