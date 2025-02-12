import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Cronometro extends JFrame {
    private int tempo;
    private JLabel contador;
    private Timer timer;

    public Cronometro(int segundos) {
        this.tempo = segundos;
        setTitle("Contagem Regressiva");
        setSize(400, 300);
        setLayout(new BorderLayout());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        contador = new JLabel(String.valueOf(tempo), SwingConstants.CENTER);
        contador.setFont(new Font("Arial", Font.BOLD, 80));
        add(contador, BorderLayout.CENTER);

        timer = new Timer(1000, new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                tempo--;
                contador.setText(String.valueOf(tempo));
                if (tempo <= 0) {
                    timer.stop();
                    contador.setText("FIM!");
                }
            }
        });

        setVisible(true);
        timer.start();
    }

    public static void main(String[] args) {
        String input = JOptionPane.showInputDialog("Digite o tempo em segundos:");
        int segundos = Integer.parseInt(input);
        new Cronometro(segundos);
    }
}
