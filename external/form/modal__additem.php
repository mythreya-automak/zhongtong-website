<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$file = $_FILES['file'];
try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'mailwebsmirno@gmail.com';                     //SMTP username
    $mail->Password   = 'mail0web_smirnoQ';                               //SMTP password
    $mail->SMTPSecure = "ssl";            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('mailwebsmirno@gmail.com', 'CarLeader');
    $mail->addAddress('youremail@gmail.com', 'CarLeader');     //Add a recipient

    //Passed variables
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $year = $_POST['year'];
    $make = $_POST['select-a-make'];
    $model = $_POST['select-a-model'];
    $mileage = $_POST['select-a-mileage'];
    $radio1 = $_POST['radio1'];
    $radio2 = $_POST['radio2'];
    $radio3 = $_POST['radio3'];
    // $mail->addAttachment('../../images/blog/blog_img_01.jpg');

    if (!empty($file['name'][0])) {
        for ($ct = 0; $ct < count($file['tmp_name']); $ct++){
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
            $filename = $file['name'][$ct];
            if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)){
                $mail->addAttachment($uploadfile, $filename);
                $rfile[] = "File $filename attached";
            } else {
                $rfile[] = "Failed to attach file $filename";
            }
        }
    };


    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Here is what was sent CarLeader, form "Add your Item"';
    $mail->Body    =
        'Name: ' .$name.
        '<br>E-mail: ' .$email.
        '<br>Phone: ' .$phone.
        '<br>Year: ' .$year.
        '<br>Make: ' .$make.
        '<br>Model: ' .$model.
        '<br>Mileage: ' .$mileage.
        '<br>Exterior Condition: ' .$radio1.
        '<br>Interior Condition: ' .$radio2.
        '<br>Been in Accident: ' .$radio3;
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
