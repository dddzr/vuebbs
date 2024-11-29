package com.bbs.vuebbs.model;
import lombok.Data;
@Data
public class Notifications {
    Integer notification_id;
    Integer user_id;
    String type;
    String message;
    String link;
    String created_at;
    String updated_at;
}
