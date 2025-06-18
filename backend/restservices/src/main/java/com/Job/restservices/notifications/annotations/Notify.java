package com.Job.restservices.notifications.annotations;

import com.Job.restservices.notifications.NotificationTypes;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface Notify {
    NotificationTypes[] notificationTypes();
    boolean mandatory();
}
