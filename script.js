const memory = {
    board: ['', '', '', ''],
    sequence: [],
    interface: '',
    move: 0,
    total_move: 0,
    interval: 1000,

    random_number() {
        let random = '';

        random = Math.floor(Math.random() * 4);
        this.sequence.push(random);
    },

    start() {
        this.interface_container();
        this.draw();
        this.initial();
    },

    initial() {
        this.move = 0;
        this.random_number();
        this.timer_turn_on();
    },

    timer_turn_on() {
        this.interval = this.interval > 3000 ? 1000 : this.interval;
        this.sequence.forEach(item => {
            setTimeout(() => {
                this.turn_on(item)
            }, this.interval += 2000);
        });

    },

    turn_on(index) {
        this.interface[index].style.border = '10px solid white';

        setTimeout(() => {
            this.turn_off(index)
        }, 1000);
    },

    turn_off(index) {
        this.interface[index].style.border = '';
    },

    play(index) {
        this.total_move = this.sequence.length;

        if (this.move <= this.total_move) {
            if (this.sequence[this.move] == index) {
                this.move++;
                if (this.move === this.total_move) {
                    console.log(this.sequence);
                    console.log('acertou');
                    this.initial();
                }
            } else {
                console.log('errou!');
            }
        }
    },

    init(container) {
        this.container_element = container;
    },

    draw() {
        let content = '';
        for (i in this.board) {
            content += `<div onclick="memory.play(${i})">${i}</div>`
        }

        this.container_element.innerHTML = content;
    },

    interface_container() {
        this.interface = this.container_element.children;
    }
}