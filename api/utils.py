import subprocess
def main():
    print("Hello!")
    parse_output()
def parse_output():
    result = subprocess.run(["Hiiiii"], stdout=subprocess.PIPE)
    print(result.stdout.decode('UTF-8'))


if __name__ == "__main__":
    main()