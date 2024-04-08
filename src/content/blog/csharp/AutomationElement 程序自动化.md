---
title: "AutomationElement 程序自动化"
author: "Charles"
description: ""
tags:
  - csharp
ogImage: ""
slug: "dotnet-automationelement"
pubDatetime: 2023-09-12T06:27:23.000+08:00
modDatetime: 2023-09-15T10:34:03.000+08:00
featured: false
draft: false
---

# 通过name查找控件，直接获取模式控件

```csharp
private async void Click()
{
    // 要查找的窗口标题
    string windowName = "系统";

    // 控件名称
    string buttonName = "登录";

    // 查找条件
    Condition windowCondition = new PropertyCondition(AutomationElement.NameProperty, windowName);
    Condition buttonCondition = new PropertyCondition(AutomationElement.NameProperty, buttonName);

    // 使用根元素查找目标窗口
    AutomationElement rootElement = AutomationElement.RootElement;
    AutomationElement window = enetRootElement.FindFirst(TreeScope.Children, windowCondition);
    if (window != null)
    {
        Console.WriteLine("已找到登录窗口");
        // 使用控件名称查找按钮
        AutomationElement button = window.FindFirst(TreeScope.Descendants, buttonCondition);
        if (button != null)
        {
            Console.WriteLine("已找到登录按钮");
            if (button.GetCurrentPattern(InvokePattern.Pattern) is InvokePattern invokePattern)
            {
                invokePattern.Invoke();
                Console.WriteLine("已点击登录按钮");
            }
            else
            {
                Console.WriteLine("登录按钮不支持InvokePattern");
            }
        }
        else
        {
            Console.WriteLine("未找到登录按钮");
        }
    }
    else
    {
        Console.WriteLine("未找到登录窗口");
    }
}
```

# 通过id查找控件，判断是否模式控件

```csharp
private async void Click()
{
    // 要查找的窗口标题
    string windowTitle = "系统";

    // 控件ID
    string buttonId = "10";

    // 查找条件
    Condition windowCondition = new PropertyCondition(AutomationElement.NameProperty, windowTitle);
    Condition buttonCondition = new PropertyCondition(AutomationElement.AutomationIdProperty, buttonId);

    // 使用根元素查找目标窗口
    AutomationElement rootElement = AutomationElement.RootElement;
    AutomationElement window = rootElement.FindFirst(TreeScope.Children, windowCondition);
    if (targetWindow != null)
    {
        Console.WriteLine("已找到登录窗口");
        // 使用控件ID查找按钮
        AutomationElement button = window.FindFirst(TreeScope.Descendants, buttonCondition);
        if (button != null)
        {
            Console.WriteLine("已找到登录按钮");
            // 尝试获取InvokeLegacyPattern
            object invokePatternObj = null;
            if (button.TryGetCurrentPattern(InvokePattern.Pattern, out invokePatternObj))
            {

                var invokeLegacyPattern = (InvokePattern)invokePatternObj;
                invokePattern.Invoke();
                Console.WriteLine("已点击登录按钮");
            }
            else
            {
                Console.WriteLine("登录按钮不支持InvokePattern");
            }
        }
        else
        {
            Console.WriteLine("未找到登录按钮");
        }
    }
    else
    {
        Console.WriteLine("未找到登录窗口");
    }
}
```

# 通过类名查找控件，模拟鼠标

```csharp
private async void Click()
{
    string windowName = "系统";
    string buttonClassName = "_EL_RgnButton";

    Condition windowCondition = new PropertyCondition(AutomationElement.NameProperty, windowName);
    Condition buttonCondition = new PropertyCondition(AutomationElement.ClassNameProperty, buttonClassName);

    AutomationElement rootElement = AutomationElement.RootElement;
    AutomationElement window = xxRootElement.FindFirst(TreeScope.Children, xxWindowCondition);
    if (window != null)
    {
        Console.WriteLine("已找到登录窗口");
        AutomationElementCollection buttons = window.FindAll(TreeScope.Descendants, buttonCondition);
        if (buttons.Count == 3)
        {
            AutomationElement thirdButton = buttons[2];
            Log.Information("已找到登录按钮");
            Rect buttonRect = (Rect)thirdButton.GetCurrentPropertyValue(AutomationElement.BoundingRectangleProperty);

            // 计算鼠标点击的坐标，通常在按钮的中心
            int x = (int)(buttonRect.Left + buttonRect.Width / 2);
            int y = (int)(buttonRect.Top + buttonRect.Height / 2);

            // 为了防止有多个屏幕，设置鼠标位置为窗口所在屏幕上的坐标
            System.Windows.Forms.Cursor.Position = new System.Drawing.Point(x, y);

            // 模拟鼠标点击
            const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
            const uint MOUSEEVENTF_LEFTUP = 0x0004;
            mouse_event(MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP, x, y, 0, 0);
            Console.WriteLine("已点击登录按钮");
        }
        else
        {
            Console.WriteLine("未找到登录按钮");
        }
    }
    else
    {
        Console.WriteLine("未找到登录窗口");
    }
}

[DllImport("user32.dll", SetLastError = true)]
public static extern void mouse_event(uint dwFlags, int dx, int dy, int dwData, int dwExtraInfo);
```

# 通过控件顺序查找控件，发送事件

```csharp
private async void Click()
{
    string windowName = "系统";
    string buttonClassName = "Button";

    IntPtr windowHandle = FindWindow(null, windowName);
    if (windowHandle != IntPtr.Zero)
    {
        // 找到目标窗口后，查找所有符合指定类名的子窗口
        IntPtr buttonHandle = IntPtr.Zero;
        int buttonCount = 0;

        while (true)
        {
            buttonHandle = FindWindowEx(windowHandle, buttonHandle, buttonClassName, null);
            if (buttonHandle == IntPtr.Zero)
                break;
            buttonCount++;
            if (buttonCount == 3) // 找到第三个按钮
            {
                // 模拟鼠标点击按钮
                const int WM_LBUTTONDOWN = 0x0201;
                const int WM_LBUTTONUP = 0x0202;
                PostMessage(buttonHandle, WM_LBUTTONDOWN, 1, 0);
                PostMessage(buttonHandle, WM_LBUTTONUP, 0, 0);
                break;
            }
        }
    }
    else
    {
        Console.WriteLine("未找到登录窗口");
    }
}
```

# 通过控件id查找控件，发送事件

```csharp
private async void Click()
{
    string windowName = "系统";
    int buttonID = 160;

    IntPtr windowHandle = FindWindow(null, windowName);
    if (windowHandle != IntPtr.Zero)
    {
        IntPtr buttonHandle = GetDlgItem(windowHandle, buttonID);

        if (buttonHandle != IntPtr.Zero)
        {
            // 模拟鼠标点击按钮
            const int WM_LBUTTONDOWN = 0x0201;
            const int WM_LBUTTONUP = 0x0202;
            PostMessage(buttonHandle, WM_LBUTTONDOWN, 1, 0);
            PostMessage(buttonHandle, WM_LBUTTONUP, 0, 0);
        }
        else
        {
            Console.WriteLine("未找到登录按钮");
        }
    }
    else
    {
        Console.WriteLine("未找到登录窗口");
    }
}
```

# AutomationElement 和句柄结合使用

```csharp
private async void metaClick()
{
    string windowName = "主目录";
    string buttonName = "登录";

    PropertyCondition windowCondition = new PropertyCondition(AutomationElement.NameProperty, windowName);
    PropertyCondition buttonCondition = new PropertyCondition(AutomationElement.NameProperty, buttonName);

    AutomationElement rootElement = AutomationElement.RootElement;
    AutomationElement window = rootElement.FindFirst(TreeScope.Descendants, windowCondition);

    if (metaWindow != null)
    {
        Log.Error("已找到登录窗口");
        AutomationElement button = window.FindFirst(TreeScope.Descendants, buttonCondition);
        if (metaButton != null)
        {
            Log.Error("已找到登录按钮");
            IntPtr buttonHandle = (IntPtr)button.Current.NativeWindowHandle;
            if (buttonHandle != IntPtr.Zero)
            {
                Log.Information("已获取登录按钮句柄");
                const int WM_LBUTTONDOWN = 0x0201;
                const int WM_LBUTTONUP = 0x0202;
                PostMessage(buttonHandle, WM_LBUTTONDOWN, 1, 0);
                PostMessage(buttonHandle, WM_LBUTTONUP, 0, 0);
                Log.Information("已点击登录按钮");
            }
        }
        else
        {
            Log.Error("未找到登录按钮");
        }
    }
    else
    {
        Log.Error("未找到登录窗口");
    }
}
```

# AutomationElement 多属性匹配

效率较低，可能引发 COM 版本异常

```csharp
private async void Click()
{
    string windowClassName = "Form";
    string windowName = "系统";
    string buttonName = "操作进入";

    PropertyCondition windowConditionClassName = new PropertyCondition(AutomationElement.ClassNameProperty, windowClassName);
    PropertyCondition windowConditionWindowName = new PropertyCondition(AutomationElement.NameProperty, windowName);
    AndCondition andCondition = new AndCondition(windowConditionClassName, windowConditionWindowName);
    PropertyCondition buttonCondition = new PropertyCondition(AutomationElement.NameProperty, buttonName);

    // 创建 AutomationElement 对象的根元素
    AutomationElement rootElement = AutomationElement.RootElement;

    // 查找符合条件的所有元素
    AutomationElementCollection elements = rootElement.FindAll(TreeScope.Descendants, andCondition);

    // 遍历找到的元素并检查是否符合条件
    foreach (AutomationElement element in elements)
    {
        // 检查元素的属性值是否与条件匹配
        string className = (string)element.GetCurrentPropertyValue(AutomationElement.ClassNameProperty);
        string name = (string)element.GetCurrentPropertyValue(AutomationElement.NameProperty);
        if (className == windowClassName && name == windowName)
        {
            Log.Error("已找到登录窗口");
            AutomationElement button = element.FindFirst(TreeScope.Descendants, buttonCondition);
            if (metaButton != null)
            {
                Log.Error("已找到登录按钮");
                IntPtr buttonHandle = (IntPtr)button.Current.NativeWindowHandle;
                if (buttonHandle != IntPtr.Zero)
                {
                    Log.Error("已获取登录按钮句柄");
                    const int WM_LBUTTONDOWN = 0x0201;
                    const int WM_LBUTTONUP = 0x0202;
                    PostMessage(buttonHandle, WM_LBUTTONDOWN, 1, 0);
                    PostMessage(buttonHandle, WM_LBUTTONUP, 0, 0);
                    Log.Information("已点击登录按钮");
                }
            }
            else {
                Log.Error("未找到登录按钮");
            }
        }
    }
}
```

# 显示某个窗口

```csharp
  private async void addClick()
  {
      string windowName = "客户姓名、年龄和性别，务必准确输入，不可重复添加！否则数据会乱";
      IntPtr windowHandle = FindWindow(null, windowName);
      if (windowHandle != IntPtr.Zero )
      {
          ShowWindow(windowHandle, 1);
      }
      else
      {
          Console.WriteLine("找不到目标窗口");
      }
  }
```

# 遍历一个窗口

```csharp
private async void Click()
{
    string windowName = "登录";
    IntPtr windowHandle = FindWindow(null, windowName);
    if (windowHandle != IntPtr.Zero )
    {
        EnumChildWindows(windowHandle, EnumChildWindowsCallback, IntPtr.Zero);
    }
    else
    {
        Console.WriteLine("找不到目标窗口");
    }
}

[DllImport("user32.dll", SetLastError = true)]
static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

[DllImport("user32.dll")]
[return: MarshalAs(UnmanagedType.Bool)]
static extern bool EnumChildWindows(IntPtr hwndParent, EnumWindowsProc lpEnumFunc, IntPtr lParam);
delegate bool EnumWindowsProc(IntPtr hwnd, IntPtr lParam);

static bool EnumChildWindowsCallback(IntPtr hwnd, IntPtr lParam)
{
    // 获取子窗口的类名
    const int maxClassNameLength = 256;
    StringBuilder className = new StringBuilder(maxClassNameLength);
    GetClassName(hwnd, className, maxClassNameLength);
     // 输出子窗口的类名
    Console.WriteLine("Child Window Class Name: " + className);
     // 返回 true 继续枚举，false 停止枚举
    return true;
}
```

# 进程获取窗口

```csharp
 IntPtr windowHandle = IntPtr.Zero;
 Process[] processes = Process.GetProcesses();
 foreach (Process process in processes)
 {
     if (process.ProcessName == "登录")
     {
         windowHandle = process.MainWindowHandle;
     }
 }
```

# SendInput 操作可见窗口

```csharp
private async void Click()
{
    // 创建模拟的鼠标点击事件
    INPUT[] inputs = new INPUT[4];
    inputs[0] = new INPUT
    {
        type = INPUT_MOUSE,
        mi = new MOUSEINPUT
        {
            dx = 65535 * 23 / Screen.PrimaryScreen.Bounds.Width, // 将 x 坐标转换为绝对坐标
            dy = 65535 * 32 / Screen.PrimaryScreen.Bounds.Height, // 将 y 坐标转换为绝对坐标
            dwFlags = MOUSEEVENTF_ABSOLUTE | MOUSEEVENTF_MOVE,
        }
    };
    inputs[1] = new INPUT
    {
        type = INPUT_MOUSE,
        mi = new MOUSEINPUT
        {
            dwFlags = MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP,
        }
    };
    inputs[2] = new INPUT
    {
        type = INPUT_MOUSE,
        mi = new MOUSEINPUT
        {
            dx = 65535 * 23 / Screen.PrimaryScreen.Bounds.Width, // 将 x 坐标转换为绝对坐标
            dy = 65535 * 57 / Screen.PrimaryScreen.Bounds.Height, // 将 y 坐标转换为绝对坐标
            dwFlags = MOUSEEVENTF_ABSOLUTE | MOUSEEVENTF_MOVE,
        }
    };
    inputs[3] = new INPUT
    {
        type = INPUT_MOUSE,
        mi = new MOUSEINPUT
        {
            dwFlags = MOUSEEVENTF_LEFTDOWN | MOUSEEVENTF_LEFTUP,
        }
    };
    // 发送输入事件
    SendInput((uint)inputs.Length, inputs, Marshal.SizeOf(typeof(INPUT)));
}
```

# 设置一个窗口的透明度

```csharp
 SetWindowLong(metaWindowHandle, GWL_EXSTYLE, (int)(GetWindowLong(metaWindowHandle, GWL_EXSTYLE) | WS_EX_LAYERED));
 SetLayeredWindowAttributes(metaWindowHandle, 0, 1, LWA_ALPHA);
 RECT rect;
 GetWindowRect(metaWindowHandle, out rect);
 int newWidth = rect.right - rect.left;
 int newHeight = rect.bottom - rect.top;
 SetWindowPos(metaWindowHandle, IntPtr.Zero, rect.left, rect.top, newWidth, newHeight, 0);
```
