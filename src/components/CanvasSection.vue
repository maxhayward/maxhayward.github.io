<script setup lang="ts">
import { type IBall } from '@/interfaces/main'
import { onMounted } from 'vue'

onMounted(() => {
  const canvas = document.getElementById('nokey') as HTMLCanvasElement

  let can_w = parseInt(canvas.getAttribute('width')!)
  let can_h = parseInt(canvas.getAttribute('height')!)
  const ctx = canvas.getContext('2d')!

  const BALL_NUM = 30

  // const ball: IBall = {
  //   x: 0,
  //   y: 0,
  //   vx: 0,
  //   vy: 0,
  //   r: 0,
  //   alpha: 1,
  //   phase: 0
  // }

  // const ball_color = {
  //   r: 207,
  //   g: 255,
  //   b: 4
  // }

  const ball_color = {
    r: 0,
    g: 0,
    b: 255
  }

  const R = 2
  let balls: IBall[] = []
  const alpha_f = 0.03
  // const alpha_phase = 0
  // Line
  const link_line_width = 0.8
  const dis_limit = 260
  // const add_mouse_point = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mouse_in = false
  const mouse_ball: IBall = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: 'mouse'
  }

  // Random speed
  function getRandomSpeed(pos: string) {
    var min = -1,
      max = 1
    switch (pos) {
      case 'top':
        return [randomNumFrom(min, max), randomNumFrom(0.1, max)]
      case 'right':
        return [randomNumFrom(min, -0.1), randomNumFrom(min, max)]
      case 'bottom':
        return [randomNumFrom(min, max), randomNumFrom(min, -0.1)]
      case 'left':
        return [randomNumFrom(0.1, max), randomNumFrom(min, max)]
      default:
        return
    }
  }
  function randomArrayItem(arr: any) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  function randomNumFrom(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
  console.log(randomNumFrom(0, 10))
  // Random Ball
  function getRandomBall(): IBall | undefined {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left'])
    switch (pos) {
      case 'top':
        return {
          x: randomSidePos(can_w),
          y: -R,
          vx: getRandomSpeed('top')![0],
          vy: getRandomSpeed('top')![1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
      case 'right':
        return {
          x: can_w + R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed('right')![0],
          vy: getRandomSpeed('right')![1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
      case 'bottom':
        return {
          x: randomSidePos(can_w),
          y: can_h + R,
          vx: getRandomSpeed('bottom')![0],
          vy: getRandomSpeed('bottom')![1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
      case 'left':
        return {
          x: -R,
          y: randomSidePos(can_h),
          vx: getRandomSpeed('left')![0],
          vy: getRandomSpeed('left')![1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10)
        }
    }
  }
  function randomSidePos(length: number) {
    return Math.ceil(Math.random() * length)
  }

  // Draw Ball
  function renderBalls() {
    Array.prototype.forEach.call(balls, function (b) {
      if (!Object.prototype.hasOwnProperty.call(b, 'type')) {
        ctx.fillStyle =
          'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')'
        ctx.beginPath()
        ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
      }
    })
  }

  // Update balls
  function updateBalls() {
    const new_balls: IBall[] = []
    Array.prototype.forEach.call(balls, function (b) {
      b.x += b.vx
      b.y += b.vy

      if (b.x > -50 && b.x < can_w + 50 && b.y > -50 && b.y < can_h + 50) {
        new_balls.push(b)
      }

      // alpha change
      b.phase += alpha_f
      b.alpha = Math.abs(Math.cos(b.phase))
      // console.log(b.alpha);
    })

    balls = new_balls.slice(0)
  }

  // Draw lines
  function renderLines() {
    var fraction, alpha
    for (var i = 0; i < balls.length; i++) {
      for (var j = i + 1; j < balls.length; j++) {
        fraction = getDisOf(balls[i], balls[j]) / dis_limit

        if (fraction < 1) {
          alpha = (1 - fraction).toString()

          ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')'
          ctx.lineWidth = link_line_width

          ctx.beginPath()
          ctx.moveTo(balls[i].x, balls[i].y)
          ctx.lineTo(balls[j].x, balls[j].y)
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
  }

  // calculate distance between two points
  function getDisOf(b1: IBall, b2: IBall) {
    var delta_x = Math.abs(b1.x - b2.x),
      delta_y = Math.abs(b1.y - b2.y)

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y)
  }

  // add balls if there a little balls
  function addBallIfy() {
    if (balls.length < BALL_NUM) {
      balls.push(getRandomBall()!)
    }
  }

  // Render
  function render() {
    ctx.clearRect(0, 0, can_w, can_h)

    renderBalls()

    renderLines()

    updateBalls()

    addBallIfy()

    window.requestAnimationFrame(render)
  }

  // Init Balls
  function initBalls(num: number) {
    for (var i = 1; i <= num; i++) {
      balls.push({
        x: randomSidePos(can_w),
        y: randomSidePos(can_h),
        vx: getRandomSpeed('top')![0],
        vy: getRandomSpeed('top')![1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10)
      })
    }
  }

  // Init Canvas
  function initCanvas() {
    canvas.setAttribute('width', window.innerWidth.toString())
    canvas.setAttribute('height', window.innerHeight.toString())

    can_w = parseInt(canvas.getAttribute('width')!)
    can_h = parseInt(canvas.getAttribute('height')!)
  }
  window.addEventListener('resize', function () {
    console.log('Window Resize...')
    initCanvas()
  })

  function goMovie() {
    initCanvas()
    initBalls(BALL_NUM)
    window.requestAnimationFrame(render)
  }
  goMovie()

  // Mouse effect
  canvas.addEventListener('mouseenter', function () {
    console.log('mouseenter')
    mouse_in = true
    balls.push(mouse_ball)
  })
  canvas.addEventListener('mouseleave', function () {
    console.log('mouseleave')
    mouse_in = false
    const new_balls: IBall[] = []
    Array.prototype.forEach.call(balls, function (b) {
      if (!Object.prototype.hasOwnProperty.call(b, 'type')) {
        new_balls.push(b)
      }
    })
    balls = new_balls.slice(0)
  })

  canvas.addEventListener('mousemove', function (e) {
    e = e || window.event
    mouse_ball.x = e.pageX
    mouse_ball.y = e.pageY
    // console.log(mouse_ball);
  })
})
</script>

<template>
  <main>
    <canvas id="nokey" width="1" height="1" />
  </main>
</template>

<style>
</style>
