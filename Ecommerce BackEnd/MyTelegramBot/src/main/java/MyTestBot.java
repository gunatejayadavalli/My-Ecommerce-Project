import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

public class MyTestBot extends TelegramLongPollingBot {

    public void onUpdateReceived(Update update) {
       System.out.println(update.getMessage().getText());

       String command = update.getMessage().getText();

       if(command.equalsIgnoreCase("/myname")){
           System.out.println(update.getMessage().getFrom().getFirstName());
       }
    }

    public String getBotUsername() {
     return "test_guna_bot";
    }

    public String getBotToken() {
     return "1013548362:AAGTrIKangOhUWNp4v2a3eGaeiDujVVE_-Q";
    }

}
